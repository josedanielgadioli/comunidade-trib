'use client';

import { CircleHelp, CornerDownRight, HeartHandshake, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import { CabecalhoVoltar } from '@/components/Cabecalho';
import { Foto } from '@/components/Foto';
import { EstadoVazio } from '@/components/ui/EstadoVazio';
import { Selo } from '@/components/ui/Selo';
import { useApp, useConsulta } from '@/lib/ContextoApp';
import { tempoRelativo } from '@/lib/tempo';
import type { Notificacao, Roteiro, TipoNotificacao } from '@/lib/tipos';

const icones: Record<TipoNotificacao, LucideIcon> = {
  resposta: CornerDownRight,
  'relato-ajudou': HeartHandshake,
  'nova-pergunta': CircleHelp,
};

/** Destaca o nome da pessoa (600) quando o texto começa por ele. */
function TextoNotificacao({ n }: { n: Notificacao }) {
  if (n.pessoa && n.texto.startsWith(n.pessoa)) {
    return (
      <>
        <span className="font-semibold">{n.pessoa}</span>
        {n.texto.slice(n.pessoa.length)}
      </>
    );
  }
  return <>{n.texto}</>;
}

function ItemNotificacao({ n, roteiro, naoLida, aoAbrir }: { n: Notificacao; roteiro?: Roteiro; naoLida: boolean; aoAbrir: () => void }) {
  const Icone = icones[n.tipo];
  return (
    <Link
      href={`/roteiro/${n.roteiroId}`}
      onClick={aoAbrir}
      className={`relative flex items-center gap-3 rounded-cartao border p-3 pl-5 ${
        naoLida ? 'border-dica-fundo bg-dica-fundo' : 'border-borda bg-branco'
      }`}
    >
      {naoLida && <span aria-hidden className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-rosa" />}
      {n.pessoa ? (
        <Avatar nome={n.pessoa} tamanho="grande" />
      ) : (
        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rosa-claro text-tinta">
          <Icone size={20} strokeWidth={1.75} />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        {naoLida && <span className="sr-only">Não lida. </span>}
        <span className="text-aux text-tinta">
          <TextoNotificacao n={n} />
        </span>
        <span className="text-[12px] leading-4 text-tinta-2">
          {roteiro?.destino} · <time dateTime={n.criadoEm}>{tempoRelativo(n.criadoEm)}</time>
        </span>
        {n.exemplo && (
          <span>
            <Selo variante="exemplo" />
          </span>
        )}
      </span>
      {roteiro && (
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-campo">
          <Foto src={roteiro.imagem.src} alt="" reserva={roteiro.tribo} sizes="48px" />
        </span>
      )}
    </Link>
  );
}

export default function Notificacoes() {
  const { lidas, marcarLidas } = useApp();
  const notificacoes = useConsulta((f) => f.listarNotificacoes(), []);
  const roteiros = useConsulta((f) => f.listarRoteiros(), []) ?? [];
  const roteiroDe = (id: string) => roteiros.find((r) => r.id === id);

  const lista = notificacoes ?? [];
  const naoLidas = lista.filter((n) => !lidas.has(n.id));
  // Grupos fixos pelo estado inicial: abrir uma notificação não a tira de "Novas".
  const grupos = [
    { titulo: 'Novas', itens: lista.filter((n) => !n.lida) },
    { titulo: 'Anteriores', itens: lista.filter((n) => n.lida) },
  ].filter((g) => g.itens.length);

  return (
    <main className="flex flex-col gap-6 px-4 pb-[calc(120px+var(--area-segura))]">
      <CabecalhoVoltar
        titulo="Notificações"
        voltarPara="/comunidade"
        acao={
          naoLidas.length > 0 && (
            <button
              type="button"
              onClick={() => marcarLidas(naoLidas.map((n) => n.id))}
              className="flex min-h-11 max-w-[8.5rem] items-center text-right text-aux font-medium leading-tight text-bordo underline-offset-4 hover:underline focus-visible:underline"
            >
              Marcar todas como lidas
            </button>
          )
        }
      />

      {notificacoes && lista.length === 0 && (
        <EstadoVazio texto="Por enquanto, nenhuma novidade. Quando alguém responder você, a gente avisa aqui." />
      )}

      {grupos.map((g) => (
        <section key={g.titulo} aria-labelledby={`grupo-${g.titulo}`} className="flex flex-col gap-3">
          <h2 id={`grupo-${g.titulo}`} className="text-secao text-tinta">
            {g.titulo}
          </h2>
          <ul className="flex flex-col gap-3">
            {g.itens.map((n) => (
              <li key={n.id}>
                <ItemNotificacao
                  n={n}
                  roteiro={roteiroDe(n.roteiroId)}
                  naoLida={!lidas.has(n.id)}
                  aoAbrir={() => marcarLidas([n.id])}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="text-aux text-tinta-2">A conversa acontece nos roteiros. Não há mensagens diretas.</p>
    </main>
  );
}
