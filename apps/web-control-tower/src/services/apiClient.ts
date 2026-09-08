/**
 * StaySphere Unified API Client Layer
 * Features:
 * 1. Automatic Live Backend Health Detection (http://localhost:4000)
 * 2. Seamless in-memory fallback for offline/demo operation
 * 3. Reactive connectivity status subscriptions
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export interface BackendStatus {
  isLive: boolean;
  checkedAt: string;
  uptimeSeconds?: number;
  product?: string;
}

class StaySphereApiClient {
  private isLive = false;
  private listeners: ((status: BackendStatus) => void)[] = [];
  private checkInterval: any = null;

  constructor() {
    this.checkHealth();
    // Poll health every 15 seconds
    if (typeof window !== 'undefined') {
      this.checkInterval = setInterval(() => this.checkHealth(), 15000);
    }
  }

  public destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  public subscribe(cb: (status: BackendStatus) => void): () => void {
    this.listeners.push(cb);
    cb({ isLive: this.isLive, checkedAt: new Date().toISOString() });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(2500),
      });

      if (res.ok) {
        const data = await res.json();
        this.isLive = data?.status === 'UP';
        this.notify({
          isLive: this.isLive,
          checkedAt: new Date().toISOString(),
          uptimeSeconds: data?.uptimeSeconds,
          product: data?.product,
        });
        return this.isLive;
      }
    } catch {
      // Backend not running, operate in offline demo mode
    }

    this.isLive = false;
    this.notify({ isLive: false, checkedAt: new Date().toISOString() });
    return false;
  }

  private notify(status: BackendStatus) {
    this.listeners.forEach((cb) => {
      try {
        cb(status);
      } catch (err) {
        console.error('Status listener error:', err);
      }
    });
  }

  public getIsLive(): boolean {
    return this.isLive;
  }

  // --- Journey APIs ---
  public async getActiveJourneys(): Promise<any[]> {
    if (this.isLive) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/journeys/active`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Live getActiveJourneys error, falling back to mock:', e);
      }
    }
    return [];
  }

  public async advanceJourneyStage(reference: string, targetStage: string): Promise<any> {
    if (this.isLive) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/journeys/${reference}/stage`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetStage }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Live advanceJourneyStage error:', e);
      }
    }
    return {
      success: true,
      journeyReference: reference,
      currentStage: targetStage,
      mode: 'OFFLINE_SIMULATION',
    };
  }

  public async cancelJourneyCascade(reference: string, reason: string): Promise<any> {
    if (this.isLive) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/journeys/${reference}/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Live cancelJourneyCascade error:', e);
      }
    }
    return {
      success: true,
      journeyReference: reference,
      status: 'CANCELLED_CASCADE',
      mode: 'OFFLINE_SIMULATION',
      message: `Cascading cancellation simulated for ${reference}`,
    };
  }

  public async redispatchStandbyTransit(reference: string, newPartnerName?: string): Promise<any> {
    if (this.isLive) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/journeys/${reference}/redispatch-standby`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPartnerName }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Live redispatchStandbyTransit error:', e);
      }
    }
    return {
      success: true,
      journeyReference: reference,
      reAssignedPartner: newPartnerName || 'Apex Sovereign Standby Fleet',
      mode: 'OFFLINE_SIMULATION',
    };
  }

  // --- Escrow & Finance APIs ---
  public async releaseEscrowMilestone(params: {
    journeyReference: string;
    milestoneType: string;
    targetParty: string;
    amount: number;
  }): Promise<any> {
    if (this.isLive) {
      try {
        const res = await fetch(`${API_BASE_URL}/finance/escrow/release-milestone`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Live releaseEscrowMilestone error:', e);
      }
    }
    const commission = Math.round(params.amount * 0.15);
    return {
      success: true,
      transactionId: `tx-sim-${Date.now()}`,
      disbursedAmount: params.amount - commission,
      commissionRetained: commission,
      mode: 'OFFLINE_SIMULATION',
    };
  }

  public async getLedgerSummary(): Promise<any> {
    if (this.isLive) {
      try {
        const res = await fetch(`${API_BASE_URL}/finance/ledger`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Live getLedgerSummary error:', e);
      }
    }
    return null;
  }
}

export const apiClient = new StaySphereApiClient();
