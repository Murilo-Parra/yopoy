export class CompanyScopedId {
  constructor(public readonly companyId: string, public readonly id: string) {
    if (!companyId || !id) throw new Error('CompanyScopedId requires both companyId and id');
  }
}
