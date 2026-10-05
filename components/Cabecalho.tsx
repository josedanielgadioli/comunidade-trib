'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

/** Cabeçalho das telas internas: voltar + título, com uma ação opcional à direita. */
export function CabecalhoVoltar({ titulo, voltarPara, acao }: { titulo: string; voltarPara: string; acao?: ReactNode }) {
  return (
    <header className="flex items-center gap-2 pt-4">
      <Link
        href={voltarPara}
        aria-label="Voltar"
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-tinta hover:bg-branco"
      >
        <ArrowLeft size={24} strokeWidth={1.75} aria-hidden />
      </Link>
      <h1 className="flex-1 text-tela text-tinta">{titulo}</h1>
      {acao}
    </header>
  );
}
