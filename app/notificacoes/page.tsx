'use client';

import { CircleHelp, CornerDownRight, HeartHandshake, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { CabecalhoVoltar } from '@/components/Cabecalho';
import { EstadoVazio } from '@/components/ui/EstadoVazio';
import { Selo } from '@/components/ui/Selo';
import { useConsulta } from '@/lib/ContextoApp';
import { formatarData } from '@/lib/formatar';
import type { TipoNotificacao } from '@/lib/tipos';

const icones: Record<TipoNotificacao, LucideIcon> = {
  resposta: CornerDownRight,
  'relato-ajudou': HeartHandshake,
  'nova-pergunta': CircleHelp,
};

export default function Notificacoes() {
  const notificacoes = useConsulta((f) => f.listarNotificacoes(), []);
  const roteiros = useConsulta((f) => f.listarRoteiros(), []) ?? [];
  const destino = (id: string) => roteiros.find((r) => r.id === id)?.destino ?? '';

  return (
    <main className="flex flex-col gap-6 px-4 pb-24">
      <CabecalhoVoltar titulo="Notificações" voltarPara="/comunidade" />

      {notificacoes && notificacoes.length === 0 && <EstadoVazio />}

      {notificacoes && notificacoes.length > 0 && (
        <ul className="flex flex-col gap-3">
          {notificacoes.map((n) => {
            const Icone = icones[n.tipo];
            return (
              <li key={n.id}>
                <Link
                  href={`/roteiro/${n.roteiroId}`}
                  className="flex gap-3 rounded-cartao border border-borda bg-branco p-4 active:bg-dica-fundo"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rosa-claro text-tinta">
                    <Icone size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-cartao text-tinta">{n.texto}</span>
                    <span className="text-aux text-tinta-2">
                      {destino(n.roteiroId)} · <time dateTime={n.criadoEm}>{formatarData(n.criadoEm)}</time>
                    </span>
                    {n.exemplo && (
                      <span className="mt-1">
                        <Selo variante="exemplo" />
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-aux text-tinta-2">A conversa acontece nos roteiros. Não há mensagens diretas.</p>
    </main>
  );
}
