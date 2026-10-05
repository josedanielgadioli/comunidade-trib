'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
