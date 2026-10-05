import type { ReactNode } from 'react';

/**
 * Fileira que desliza para o lado, com scroll-snap.
 * Encosta na borda direita da tela para sugerir que há mais cartões.
 * Com o teclado, Tab percorre os cartões e o navegador rola até o item focado.
 */
export function FileiraHorizontal({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="-mr-4">
      <ul
        aria-label={rotulo}
        className="-my-1 -ml-1 flex snap-x snap-mandatory scroll-pl-1 gap-3 overflow-x-auto py-1 pl-1 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}

export function ItemFileira({ largura, children }: { largura: string; children: ReactNode }) {
  return <li className={`flex shrink-0 snap-start ${largura}`}>{children}</li>;
}
