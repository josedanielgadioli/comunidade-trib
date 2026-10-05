'use client';

import { CircleCheck, Info } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type TipoToast = 'sucesso' | 'aviso';

interface Mensagem {
  id: number;
  texto: string;
  tipo: TipoToast;
}

const ContextoToast = createContext<((texto: string, tipo?: TipoToast) => void) | null>(null);

export function ProvedorToast({ children }: { children: React.ReactNode }) {
  const [mensagem, setMensagem] = useState<Mensagem | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const mostrar = useCallback((texto: string, tipo: TipoToast = 'aviso') => {
    setMensagem({ id: Date.now(), texto, tipo });
  }, []);

  useEffect(() => {
    if (!mensagem) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMensagem(null), 3500);
    return () => clearTimeout(timer.current);
  }, [mensagem]);

  const Icone = mensagem?.tipo === 'sucesso' ? CircleCheck : Info;

  return (
    <ContextoToast.Provider value={mostrar}>
      {children}
      {/* Região sempre presente para leitores de tela anunciarem a mensagem. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-32 z-30 mx-auto flex max-w-coluna justify-center px-4"
      >
        {mensagem && (
          <div
            key={mensagem.id}
            className="flex items-center gap-2 rounded-cartao border border-borda bg-branco px-4 py-3 text-corpo text-tinta shadow-md motion-safe:animate-[entrar_200ms_ease-out]"
          >
            <Icone size={20} strokeWidth={1.75} aria-hidden className="shrink-0 text-verde" />
            <span>{mensagem.texto}</span>
          </div>
        )}
      </div>
    </ContextoToast.Provider>
  );
}

export function useToast() {
  const mostrar = useContext(ContextoToast);
  if (!mostrar) throw new Error('useToast precisa estar dentro de ProvedorToast');
  return mostrar;
}
