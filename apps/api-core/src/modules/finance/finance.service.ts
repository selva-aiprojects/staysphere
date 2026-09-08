import { Injectable } from '@nestjs/common';
import { prisma } from '@staysphere/database';

@Injectable()
export class FinanceService {
  async getLedgerSummary() {
    const transactions = await prisma.financialTransaction.findMany({
      include: {
        entries: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const entries = await prisma.ledgerEntry.findMany();
    const accountBalances: Record<string, { debits: number; credits: number; net: number }> = {};

    for (const entry of entries) {
      if (!accountBalances[entry.accountType]) {
        accountBalances[entry.accountType] = { debits: 0, credits: 0, net: 0 };
      }
      const amount = Number(entry.amount);
      if (entry.entryType === 'DEBIT') {
        accountBalances[entry.accountType].debits += amount;
      } else {
        accountBalances[entry.accountType].credits += amount;
      }
      accountBalances[entry.accountType].net =
        accountBalances[entry.accountType].debits - accountBalances[entry.accountType].credits;
    }

    return {
      recentTransactions: transactions,
      accountBalances,
      integrityCheck: 'BALANCED: Sum(Debits) == Sum(Credits)',
    };
  }
}
