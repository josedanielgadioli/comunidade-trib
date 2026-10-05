'use client';

interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
  /** Número exibido ao lado do nome (peso 400). */
  contagem?: number;
}

interface Props<T extends string> {
  rotulo: string;
  opcoes: Opcao<T>[];
  valor: T;
  aoMudar: (valor: T) => void;
}

// Chip visual de 40 px dentro de um alvo de toque de 44 px.
const classeChip = (selecionado: boolean) =>
  `inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-4 text-aux text-tinta ${
    selecionado ? 'bg-rosa-claro' : 'border border-borda bg-branco'
  }`;

/**
 * Chips numa linha só, com rolagem lateral sem barra visível.
 * A linha encosta na borda direita da tela para sugerir que continua.
 */
export function Chips<T extends string>({ rotulo, opcoes, valor, aoMudar }: Props<T>) {
  return (
    <div className="-mr-4">
      <div
        role="group"
        aria-label={rotulo}
        className="-my-1 -ml-1 flex gap-2 overflow-x-auto py-1 pl-1 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {opcoes.map((o) => {
          const selecionado = o.valor === valor;
          return (
            <button
              key={o.valor}
              type="button"
              aria-pressed={selecionado}
              onClick={() => aoMudar(o.valor)}
              className="flex min-h-11 shrink-0 items-center rounded-full"
            >
              <span className={classeChip(selecionado)}>
                <span className={selecionado ? 'font-semibold' : 'font-medium'}>{o.rotulo}</span>
                {o.contagem !== undefined && <span className="font-normal">{o.contagem}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
