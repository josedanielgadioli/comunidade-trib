import type { ReactNode } from 'react';

/**
 * A partir de 768 px, mostra o protótipo dentro de um contorno de celular com rolagem própria.
 * Abaixo disso, as classes não se aplicam e o layout fica exatamente como no celular.
 *
 * O `transform` torna a moldura o "bloco de contenção" dos elementos `position: fixed`
 * (barra de navegação, rodapé, botão principal, toasts): eles se prendem à moldura,
 * e não à janela, sem nenhuma mudança nas telas.
 */
export function MolduraCelular({ children }: { children: ReactNode }) {
  return (
    <div className="md:h-[min(844px,calc(100vh-32px))] md:w-[410px] md:shrink-0 md:overflow-hidden md:rounded-[40px] md:border-[10px] md:border-tinta md:bg-areia md:[transform:translateZ(0)]">
      <div
        data-rolagem-moldura
        className="md:h-full md:overflow-y-auto md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
