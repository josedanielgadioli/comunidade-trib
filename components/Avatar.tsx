import { UserRound } from 'lucide-react';

/** "Viajante Ana" → "VA"; "Marina" → "M". */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return '';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}

/** Círculo de 28 px com as iniciais. Nunca foto de pessoa. */
export function Avatar({ nome }: { nome: string }) {
  const texto = iniciais(nome);
  return (
    <span
      aria-hidden
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rosa-claro text-selo text-tinta"
    >
      {texto || <UserRound size={16} strokeWidth={1.75} />}
    </span>
  );
}
