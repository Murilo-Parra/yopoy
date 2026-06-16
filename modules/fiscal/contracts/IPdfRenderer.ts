import { DanfeRenderInput, DanfeRenderResult, PdfRenderOptions } from "../types/danfe.types";

export interface IPdfRenderer {
  renderDanfe(input: DanfeRenderInput, options?: PdfRenderOptions): Promise<DanfeRenderResult>;
  renderNfse(input: DanfeRenderInput, options?: PdfRenderOptions): Promise<DanfeRenderResult>;
  renderEventReport(input: DanfeRenderInput, options?: PdfRenderOptions): Promise<DanfeRenderResult>;
}
