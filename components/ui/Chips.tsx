'use client';

interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
}

interface Props<T extends string> {
  rotulo: string;
  opcoes: Opcao<T>[];
  valor: T;
  aoMudar: (valor: T) => void;
}

// Chip visual de 40 px dentro de um alvo de toque de 44 px.
export const classeChip = (selecionado: boolean) =>
  `inline-flex h-10 items-center rounded-full px-4 text-aux ${
    selecionado ? 'bg-rosa-claro font-semibold text-tinta' : 'border border-borda bg-branco text-tinta'
  }`;

export function Chips<T extends string>({ rotulo, opcoes, valor, aoMudar }: Props<T>) {
  return (
    <div role="group" aria-label={rotulo} className="flex flex-wrap gap-2">
      {opcoes.map((o) => {
        const selecionado = o.valor === valor;
        return (
          <button
            key={o.valor}
            type="button"
            aria-pressed={selecionado}
            onClick={() => aoMudar(o.valor)}
            className="flex min-h-11 items-center rounded-full"
          >
            <span className={classeChip(selecionado)}>{o.rotulo}</span>
          </button>
        );
      })}
    </div>
  );
}
