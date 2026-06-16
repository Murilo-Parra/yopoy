import { SefazEventQueue } from "./SefazEventQueue";

export class SefazEventRetryManager {
  /**
   * Força a tentativa de envio de um evento que falhou
   */
  public static async retryEvent(id: string): Promise<boolean> {
    try {
      // Re-define para originar na fila como PENDING
      await SefazEventQueue.updateStatus(id, 'PENDING', undefined, new Date());
      console.log(`[SefazEventRetryManager] Evento ${id} enfileirado para re-tentativa imediata.`);
      return true;
    } catch (err) {
       console.error(`[SefazEventRetryManager] Erro forçando re-tentativa do evento ${id}:`, err);
       return false;
    }
  }
}
