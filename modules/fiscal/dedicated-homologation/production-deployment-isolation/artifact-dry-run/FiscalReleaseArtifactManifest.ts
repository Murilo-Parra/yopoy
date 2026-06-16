export class FiscalReleaseArtifactManifest {
  public static generateManifest() {
    return {
      releaseArtifactManifestGenerated: true,
      releaseArtifactManifestOnly: true,
      executableArtifactGenerated: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Documentary manifest of release artifacts. No executable binaries or scripts are generated.'
    };
  }
}
