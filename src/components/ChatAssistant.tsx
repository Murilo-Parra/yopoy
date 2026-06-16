/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      text: 'Olá! Sou o seu Assistente Empresarial Inteligente. Posso lhe auxiliar a entender os relatórios fiscais, planejar o endereçamento do estoque logístico no galpão, calcular impostos simples ou planejar o faturamento comercial. Qual é sua dúvida contábil ou logística hoje?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll para baixo no chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userText = inputMessage.trim();
    const newUserMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/gemini/chat-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Falha no processamento da resposta da IA.');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: 'msg_ai_' + Date.now(),
        role: 'assistant',
        text: data.text || 'Desculpe, não consegui formular uma resposta contábil sobre essa questão.'
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        role: 'assistant',
        text: 'Ocorreu um erro ao consultar o assistente Gemini. Certifique-se de preencher a chave GEMINI_API_KEY no menu de segredos (Secrets) do AI Studio.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init_new',
        role: 'assistant',
        text: 'Histórico limpo. Como posso apoiar os seus negócios agora?'
      }
    ]);
  };

  const SUGGESTED_QUESTIONS = [
    'Como calcular o faturamento contábil líquido?',
    'Dicas para endereçamento físico eficiente de estoque',
    'Como funciona o alerta de vencimentos de validade?',
    'Como registrar um recibo fiscal por foto/imagem?'
  ];

  return (
    <div className="bg-[#111114] border border-[#222228] rounded-2xl overflow-hidden shadow-sm flex flex-col h-[600px] max-h-[80vh]">
      
      {/* Header do Chat */}
      <div className="bg-[#16161a] border-b border-[#222228] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-2 rounded-xl text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-200 text-sm">Consultor Fiscal & Logístico IA</h3>
            <p className="text-[10px] text-emerald-400 font-mono">Conectado ao Gemini 3.5 Flash</p>
          </div>
        </div>
        
        <button
          onClick={handleClearChat}
          title="Limpar conversa"
          className="text-gray-500 hover:text-red-400 p-2 rounded-lg hover:bg-[#1c1c21] transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Caixa de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`p-2 h-9 w-9 rounded-xl flex-shrink-0 flex items-center justify-center ${
              m.role === 'user' ? 'bg-sky-950 text-sky-400' : 'bg-[#1c1c21] text-emerald-400 border border-[#222228]'
            }`}>
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Balão */}
            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
              m.role === 'user' 
                ? 'bg-sky-600 text-white rounded-tr-none font-medium' 
                : 'bg-[#16161a] text-slate-200 border border-[#222228] rounded-tl-none markdown-body'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="p-2 h-9 w-9 rounded-xl bg-[#1c1c21] text-emerald-400 border border-[#222228] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-[#16161a] border border-[#222228] text-gray-400 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 font-mono">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              Sua resposta contábil está sendo formulada...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Mensagens sugeridas rápidas */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-[#222228] bg-[#0d0d10] flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Dúvidas Frequentes:
          </span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputMessage(q)}
              className="bg-[#1c1c21] hover:bg-[#22222c] text-slate-300 hover:text-white border border-[#222228] rounded-full py-1 px-3 text-[10px] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Caixa de Formulário para Envio */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-[#222228] bg-[#16161a] flex gap-2">
        <input
          type="text"
          placeholder="Pergunte sobre logística, DRE, contratações ou fluxo de caixa..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 bg-[#111114] border border-[#222228] rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isSending}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-3 rounded-xl transition flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
