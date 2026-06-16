import { ShadowDashboardFiltersDTO } from "../dto/ShadowDashboardDTOs";

export class ShadowDashboardValidators {
  public static validateFilters(query: any): ShadowDashboardFiltersDTO {
    const filters: ShadowDashboardFiltersDTO = {};

    if (query.companyId && typeof query.companyId === "string") {
      filters.companyId = this.sanitizeString(query.companyId);
    }
    if (query.route && typeof query.route === "string") {
      filters.route = this.sanitizeString(query.route);
    }
    if (query.operation && typeof query.operation === "string") {
      filters.operation = this.sanitizeString(query.operation);
    }
    if (query.severity && typeof query.severity === "string") {
      filters.severity = this.sanitizeString(query.severity);
    }
    if (query.matched !== undefined) {
      if (query.matched === "true" || query.matched === true) filters.matched = true;
      else if (query.matched === "false" || query.matched === false) filters.matched = false;
    }
    if (query.dateFrom && typeof query.dateFrom === "string") {
      filters.dateFrom = this.sanitizeString(query.dateFrom);
    }
    if (query.dateTo && typeof query.dateTo === "string") {
      filters.dateTo = this.sanitizeString(query.dateTo);
    }

    const limit = parseInt(query.limit as string);
    filters.limit = !isNaN(limit) && limit > 0 && limit <= 500 ? limit : 50;

    const offset = parseInt(query.offset as string);
    filters.offset = !isNaN(offset) && offset >= 0 ? offset : 0;

    return filters;
  }

  private static sanitizeString(val: string): string {
    // Prevent SQL injection vectors in string fields just in case (though using parameterized queries)
    return val.replace(/['";\\]/g, "");
  }
}
