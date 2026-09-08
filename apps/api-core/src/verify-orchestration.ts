/**
 * Automated Verification Suite for StaySphere Journey Orchestration & Ledger Balancing
 */
import { JourneyService } from './modules/journey/journey.service';
import { FinanceService } from './modules/finance/finance.service';

async function runVerificationTests() {
  console.log('===========================================================');
  console.log('🧪 Starting StaySphere Orchestration & Ledger Test Suite');
  console.log('===========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  const journeyService = new JourneyService();
  const financeService = new FinanceService();

  // Test 1: Journey Creation
  console.log('📋 Test Group 1: Atomic 3-in-1 Journey Creation');
  const newJourney = await journeyService.createJourney({
    guestName: 'Ananya Roy',
    guestEmail: 'ananya.roy@capital.io',
    guestPhone: '+91 99887 66554',
    vipTier: 'SOVEREIGN_PLATINUM',
    propertyName: 'The Vana Azure Ocean Estate',
    roomType: 'Presidential Cliffside Villa',
    checkInDate: '2026-10-01',
    checkOutDate: '2026-10-05',
    nights: 4,
    stayAmount: 200000,
    transitVehicle: 'Mercedes-Maybach S680',
    transitAmount: 6000,
    pickupLocation: 'MOPA Airport T1',
    dropLocation: 'The Vana Azure Ocean Estate',
  });

  assert(newJourney.journeyReference.startsWith('JN-SS-'), 'Journey reference generated correctly');
  assert(newJourney.binding.totalJourneyAmount === 206000, 'Total journey amount sums stay + transit (₹2,06,000)');
  assert(newJourney.currentStage === 'PRE_ARRIVAL_FLIGHT', 'Initial stage is PRE_ARRIVAL_FLIGHT');

  // Test 2: Journey Stage Progression
  console.log('\n📋 Test Group 2: Lifecycle Stage Advancement');
  const advanceRes = await journeyService.advanceJourneyStage(newJourney.journeyReference, 'AIRPORT_PICKUP_TRANSIT');
  assert(advanceRes.success === true, 'Stage advance returns success');
  assert(advanceRes.currentStage === 'AIRPORT_PICKUP_TRANSIT', 'Stage successfully transitioned to AIRPORT_PICKUP_TRANSIT');

  // Test 3: Standby Re-dispatch
  console.log('\n📋 Test Group 3: Emergency Standby Re-dispatch');
  const redispatchRes = await journeyService.redispatchStandbyTransit(newJourney.journeyReference, 'Sovereign Standby Unit Beta');
  assert(redispatchRes.success === true, 'Emergency standby re-dispatch returns success');
  assert(redispatchRes.reAssignedPartner === 'Sovereign Standby Unit Beta', 'Standby partner assigned to journey');
  assert(redispatchRes.etaMinutes <= 10, 'Standby driver ETA is within 10 minutes');

  // Test 4: Cascading Cancellation
  console.log('\n📋 Test Group 4: Cascading Cancellation Engine');
  const cancelRes = await journeyService.cancelJourneyCascade(newJourney.journeyReference, 'Flight cancelled due to weather');
  assert(cancelRes.success === true, 'Cascading cancellation executed successfully');
  assert(cancelRes.refundAmount === 206000, 'Full journey amount refunded to guest (₹2,06,000)');

  // Test 5: Escrow Milestone Release & Ledger Balancing
  console.log('\n📋 Test Group 5: Double-Entry Escrow Ledger Integrity');
  const milestoneRelease = await financeService.releaseEscrowMilestone({
    journeyReference: 'JN-SS-2026-9041',
    milestoneType: 'CURBSIDE_PICKUP_HANDSHAKE',
    targetParty: 'TRAVEL_OPERATOR',
    amount: 4500,
    platformCommissionPct: 15,
  });

  assert(milestoneRelease.success === true, 'Milestone release returns success');
  assert(milestoneRelease.disbursedAmount === 3825, 'Partner payout is 85% (₹3,825)');
  assert(milestoneRelease.commissionRetained === 675, 'Platform commission is 15% (₹675)');
  assert(
    milestoneRelease.disbursedAmount + milestoneRelease.commissionRetained === 4500,
    'Balanced ledger equation: Partner Payout + Commission === Released Amount',
  );

  const ledgerSummary = await financeService.getLedgerSummary();
  assert(ledgerSummary.integrityCheck.includes('BALANCED'), 'Ledger integrity check reports BALANCED');

  console.log('\n===========================================================');
  console.log(`📊 Verification Complete: ${passed} Passed, ${failed} Failed`);
  console.log('===========================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerificationTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
