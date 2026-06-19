import { GoogleGenAI, Type, type Part } from "@google/genai";
import type { Express, Request, Response } from "express";

interface ParseReceiptRequestBody {
  imageBase64?: string;
  textContent?: string;
}

interface ChatAssistantRequestBody {
  message: string;
  history?: unknown;
}

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Aviso: GEMINI_API_KEY não foi encontrada no ambiente de execução.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiInstance;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === "object"
    && error !== null
    && "message" in error
    && typeof error.message === "string"
    && error.message
  ) {
    return error.message;
  }
  return fallback;
}

export function registerGeminiRoutes(app: Pick<Express, "post">): void {
  // 1. Rota de parsing de recibo com Inteligência Artificial estruturada
  app.post("/api/gemini/parse-receipt", async (
    req: Request<Record<string, string>, unknown, ParseReceiptRequestBody>,
    res: Response
  ): Promise<void> => {
    try {
      const { imageBase64, textContent } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        res.status(503).json({
          error: "Serviço de IA temporariamente indisponível. Por favor, verifique se a chave de API foi inserida na aba Secrets do AI Studio.",
        });
        return;
      }

      const contents: Part[] = [];
      let promptText = "Analise o recibo comercial, nota fiscal ou comprovante fornecido. Extraia os dados de forma precisa e estruturada conforme o esquema de saída JSON fornecido. Se houver itens na nota, extraia todos com nome, quantidade e preço.";

      if (imageBase64) {
        // Extrair os dados de metadados da imagem base64 se inseridos
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        let mimeType = "image/jpeg";
        const match = imageBase64.match(/^data:(image\/\w+);base64,/);
        if (match) {
          mimeType = match[1];
        }

        contents.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        });
        promptText += " Utilize a imagem anexada do recibo para extração direta.";
      } else if (textContent) {
        promptText += ` Utilize o seguinte texto extraído do recibo:\n\n${textContent}`;
      } else {
        res.status(400).json({ error: "Nenhum conteúdo (imagem base64 ou texto) foi enviado para análise." });
        return;
      }

      contents.push({ text: promptText });

      // Instanciação da resposta JSON estruturada
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: "Você é um auditor financeiro e contábil especialista. Seu objetivo é analisar notas fiscais, cupons, recibos e preencher os dados exatos de data, valor total, categoria de despesa, estabelecimento e itens de forma estruturada. Nunca invente dados que não existam ou não possam ser estimados a partir do cupom.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              establishmentName: {
                type: Type.STRING,
                description: "Nome do estabelecimento ou da empresa que emitiu o recibo ou nota."
              },
              amount: {
                type: Type.NUMBER,
                description: "Valor total do recibo ou compra (formato float)."
              },
              date: {
                type: Type.STRING,
                description: "Data da transação no formato YYYY-MM-DD. Se indisponível, retorne a data atual de 2026-05-31."
              },
              category: {
                type: Type.STRING,
                description: "Categoria da despesa ('Suprimentos', 'Logística', 'Funcionários', 'Impostos', 'Alimentação', 'Tecnologia' ou 'Outros')."
              },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Nome limpo do produto ou serviço." },
                    qty: { type: Type.INTEGER, description: "Quantidade do item comprada." },
                    price: { type: Type.NUMBER, description: "Preço total ou unitário do respectivo item." }
                  },
                  required: ["name"]
                },
                description: "Lista de itens ou produtos descritos no recibo."
              }
            },
            required: ["establishmentName", "amount"]
          }
        }
      });

      const outputText = response.text;
      if (outputText) {
        const parsedData: unknown = JSON.parse(outputText.trim());
        res.json(parsedData);
      } else {
        res.status(500).json({ error: "O modelo falhou ao gerar um JSON estruturado." });
      }
    } catch (error: unknown) {
      console.error("Erro ao analisar recibo com Gemini:", error);
      res.status(500).json({ error: getErrorMessage(error, "Erro interno ao processar nota fiscal.") });
    }
  });

  // 2. Chat assistente contábil e logístico empresarial
  app.post("/api/gemini/chat-assistant", async (
    req: Request<Record<string, string>, unknown, ChatAssistantRequestBody>,
    res: Response
  ): Promise<void> => {
    try {
      const { message, history } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        res.status(503).json({
          error: "Serviço de IA temporariamente indisponível. Para ativá-lo, certifique-se de configurar a API key.",
        });
        return;
      }

      const chats = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "Você é um assistente virtual especialista em contabilidade e logística de estoque de pequenas e médias empresas. Dê respostas precisas, em português de negócios, educadas, auxiliando sobre fluxo de caixa, DRE simples, controle de vencimentos e endereçamento de estoque."
        }
      });

      void history;
      const response = await chats.sendMessage({ message: message });
      res.json({ text: response.text });
    } catch (error: unknown) {
      console.error("Erro no chat contábil:", error);
      res.status(500).json({ error: getErrorMessage(error, "Erro no chat corporativo") });
    }
  });
}
