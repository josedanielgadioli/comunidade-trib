'use client';

import { usePathname } from 'next/navigation';
import { temBarraNavegacao } from '@/components/BarraNavegacao';

/** Aviso discreto de protótipo: logo acima da barra de navegação, ou na base quando ela não existe. */
export function RodapePrototipo() {
  const comBarra = temBarraNavegacao(usePathname());
  return (
    <footer
      style={{ bottom: comBarra ? 'var(--altura-barra-nav)' : 'var(--area-segura)' }}
      className="fixed inset-x-0 z-20 mx-auto flex h-6 max-w-coluna items-center justify-center whitespace-nowrap bg-areia px-2 text-[11px] leading-4 text-tinta-2"
    >
      Protótipo para testes — Comunidade Trib · Imagens ilustrativas
    </footer>
  );
}
