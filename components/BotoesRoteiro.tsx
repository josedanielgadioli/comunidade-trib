'use client';

import { Bookmark, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { useApp } from '@/lib/ContextoApp';
import { compartilharLink } from '@/lib/compartilhar';

/** Círculo branco de 44 px com sombra leve, para botões sobre a foto. */
export const classeBotaoSobreFoto =
  'flex h-11 w-11 items-center justify-center rounded-full bg-branco text-tinta shadow-leve active:bg-dica-fundo';

export function BotaoSalvar({ roteiroId }: { roteiroId: string }) {
  const { salvos, alternarSalvo } = useApp();
  const mostrarToast = useToast();
  const salvo = salvos.has(roteiroId);

  return (
    <button
      type="button"
      aria-label="Salvar roteiro"
      aria-pressed={salvo}
      onClick={() => {
        const agora = alternarSalvo(roteiroId);
        mostrarToast(agora ? 'Roteiro salvo' : 'Roteiro removido dos salvos', 'sucesso');
      }}
      className={classeBotaoSobreFoto}
    >
      <Bookmark
        size={24}
        strokeWidth={1.75}
        aria-hidden
        className={salvo ? 'text-rosa-acao' : 'text-tinta'}
        fill={salvo ? 'currentColor' : 'none'}
      />
    </button>
  );
}

export function BotaoCompartilhar({ roteiroId, destino }: { roteiroId: string; destino: string }) {
  const mostrarToast = useToast();

  async function compartilhar() {
    const url = `${window.location.origin}/roteiro/${roteiroId}`;
    const resultado = await compartilharLink(`${destino} · Comunidade Trib`, url);
    if (resultado === 'copiado') mostrarToast('Link copiado', 'sucesso');
    if (resultado === 'erro') mostrarToast('Não deu para copiar o link');
  }

  return (
    <button type="button" aria-label="Compartilhar roteiro" onClick={compartilhar} className={classeBotaoSobreFoto}>
      <Share2 size={24} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
