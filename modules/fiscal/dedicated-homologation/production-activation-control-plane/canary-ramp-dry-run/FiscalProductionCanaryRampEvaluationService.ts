import { FiscalProductionCanaryRampSimulation } from './FiscalProductionCanaryRampSimulation';
import { FiscalProductionTrafficPromotionNoOpPlan } from './FiscalProductionTrafficPromotionNoOpPlan';
import { FiscalProductionTrafficSliceSimulationMatrix } from './FiscalProductionTrafficSliceSimulationMatrix';
import { FiscalProductionCanaryPercentageNoOpMatrix } from './FiscalProductionCanaryPercentageNoOpMatrix';
import { FiscalProductionReversibleTrafficPromotionPlan } from './FiscalProductionReversibleTrafficPromotionPlan';
import { FiscalProductionLegacyContinuityDuringCanaryPlan } from './FiscalProductionLegacyContinuityDuringCanaryPlan';
import { FiscalProductionCanaryAbortReversionMatrix } from './FiscalProductionCanaryAbortReversionMatrix';
import { FiscalProductionNoRealTrafficPromotionEvidence } from './FiscalProductionNoRealTrafficPromotionEvidence';
import { FiscalProductionNoRealCanaryActivationEvidence } from './FiscalProductionNoRealCanaryActivationEvidence';
import { FiscalProductionCanaryRampDependencyMatrix } from './FiscalProductionCanaryRampDependencyMatrix';
import { FiscalProductionCanaryRampBlockerRegister } from './FiscalProductionCanaryRampBlockerRegister';
import { FiscalProductionCanaryRampRiskRegister } from './FiscalProductionCanaryRampRiskRegister';
import { FiscalProductionCanaryRampPolicy } from './FiscalProductionCanaryRampPolicy';
import { FiscalProductionCanaryRampValidator } from './FiscalProductionCanaryRampValidator';
import { FiscalProductionActivationCanaryRampInput } from './FiscalProductionActivationCanaryRampTypes';

export class FiscalProductionCanaryRampEvaluationService {
  public static evaluate(input: FiscalProductionActivationCanaryRampInput) {
    FiscalProductionCanaryRampValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionCanaryRampPolicy.getPolicyMessage(),
      canaryRampSimulation: FiscalProductionCanaryRampSimulation.simulate(),
      trafficPromotionNoOpPlan: FiscalProductionTrafficPromotionNoOpPlan.getPlan(),
      trafficSliceSimulationMatrix: FiscalProductionTrafficSliceSimulationMatrix.getMatrix(),
      canaryPercentageNoOpMatrix: FiscalProductionCanaryPercentageNoOpMatrix.getMatrix(),
      reversibleTrafficPromotionPlan: FiscalProductionReversibleTrafficPromotionPlan.getPlan(),
      legacyContinuityDuringCanaryPlan: FiscalProductionLegacyContinuityDuringCanaryPlan.getPlan(),
      canaryAbortReversionMatrix: FiscalProductionCanaryAbortReversionMatrix.getMatrix(),
      noRealTrafficPromotionEvidence: FiscalProductionNoRealTrafficPromotionEvidence.getEvidence(),
      noRealCanaryActivationEvidence: FiscalProductionNoRealCanaryActivationEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionCanaryRampDependencyMatrix.getMatrix(),
      blockers: FiscalProductionCanaryRampBlockerRegister.getBlockers(),
      risks: FiscalProductionCanaryRampRiskRegister.getRisks()
    };
  }
}
