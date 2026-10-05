'use client';

import { ArrowLeft, Bell } from 'lucide-react';
import Link from 'next/link';
import { LogoSlot } from '@/components/LogoSlot';
import { NOTIFICACOES_NAO_LIDAS } from '@/data/exemplo';

/** Cabeçalho da home: marca em texto + sino com contador simulado. */
export function CabecalhoMarca({ comSino = true }: { comSino?: boolean }) {
  return (
    <header className="flex items-center justify-between gap-3 pt-4">
      <div className="flex items-center gap-2">
        <LogoSlot />
        <h1 className="text-tela text-tinta">Comunidade Trib</h1>
      </div>
      {comSino && (
        <Link
          href="/notificacoes"
          aria-label={`Notificações, ${NOTIFICACOES_NAO_LIDAS} novas`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-tinta hover:bg-branco"
        >
          <Bell size={24} strokeWidth={1.75} aria-hidden />
          <span
            aria-hidden
            className="absolute right-0 top-0 inline-flex min-w-5 items-center justify-center rounded-full bg-rosa-acao px-1 text-selo text-branco"
          >
            {NOTIFICACOES_NAO_LIDAS}
          </span>
        </Link>
      )}
    </header>
  );
}

/** Cabeçalho das telas internas: voltar + título. */
export function CabecalhoVoltar({ titulo, voltarPara }: { titulo: string; voltarPara: string }) {
  return (
    <header className="flex items-center gap-2 pt-4">
      <Link
        href={voltarPara}
        aria-label="Voltar"
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-tinta hover:bg-branco"
      >
        <ArrowLeft size={24} strokeWidth={1.75} aria-hidden />
      </Link>
      <h1 className="text-tela text-tinta">{titulo}</h1>
    </header>
  );
}
