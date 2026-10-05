'use client';

import { usePathname } from 'next/navigation';
import { temBarraNavegacao } from '@/components/BarraNavegacao';

export const TEXTO_RODAPE = 'Protótipo para testes — Comunidade Trib · Imagens geradas por IA';

/**
 * Aviso discreto de protótipo: logo acima da barra de navegação, ou na base quando ela não existe.
 * A partir de 1024 px ele sai da moldura e aparece embaixo do painel (PainelDesktop).
 */
export function RodapePrototipo() {
  const comBarra = temBarraNavegacao(usePathname());
  return (
    <footer
      style={{
        bottom: comBarra ? 'var(--altura-barra-nav)' : 'var(--area-segura)',
        height: 'var(--altura-rodape)',
      }}
      className="fixed inset-x-0 z-20 mx-auto flex max-w-coluna lg:hidden items-center justify-center bg-areia px-4 text-center text-[11px] leading-[14px] text-tinta-2"
    >
      {TEXTO_RODAPE}
    </footer>
  );
}
