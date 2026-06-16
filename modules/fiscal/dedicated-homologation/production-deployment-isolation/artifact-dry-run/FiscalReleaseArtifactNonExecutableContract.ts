export class FiscalReleaseArtifactNonExecutableContract {
  public static generateContract() {
    return {
      nonExecutableContractGenerated: true,
      nonExecutableArtifactOnly: true,
      executableArtifactGenerated: false,
      approvedForRealRelease: false,
      approvedForRealDeploy: false,
      description: 'Contract affirming that the artifact is purely administrative and not executable.'
    };
  }
}
