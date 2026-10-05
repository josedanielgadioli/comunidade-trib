import { UserRound } from 'lucide-react';

/** "Viajante Ana" → "VA"; "Marina" → "M". */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return '';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}

const tamanhos = {
  // 28 px: listas e cartões. 40 px: notificações.
  pequeno: 'h-7 w-7 text-selo',
  grande: 'h-10 w-10 text-aux font-semibold',
} as const;

/** Círculo com as iniciais sobre rosa-claro. Nunca foto de pessoa. */
export function Avatar({ nome, tamanho = 'pequeno' }: { nome: string; tamanho?: keyof typeof tamanhos }) {
  const texto = iniciais(nome);
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-rosa-claro text-tinta ${tamanhos[tamanho]}`}
    >
      {texto || <UserRound size={tamanho === 'grande' ? 20 : 16} strokeWidth={1.75} />}
    </span>
  );
}
