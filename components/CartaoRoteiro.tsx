import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Ilustracao } from '@/components/ilustracoes/Ilustracao';
import { Selo, SeloTribo } from '@/components/ui/Selo';
import { formatarData, plural } from '@/lib/formatar';
import type { Roteiro } from '@/lib/tipos';

export function CartaoRoteiro({ roteiro, numComentarios }: { roteiro: Roteiro; numComentarios: number }) {
  return (
    <Link
      href={`/roteiro/${roteiro.id}`}
      className="relative flex w-full flex-col overflow-hidden rounded-cartao border border-borda bg-branco active:bg-dica-fundo"
    >
      <div className="relative h-36 overflow-hidden rounded-t-cartao">
        <Ilustracao cena={roteiro.tribo} />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {roteiro.curadoria && <Selo variante="curadoria" sobreImagem />}
          <SeloTribo tribo={roteiro.tribo} sobreImagem />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {roteiro.exemplo && (
          <div className="mb-1">
            <Selo variante="exemplo" />
          </div>
        )}
        <h3 className="text-cartao text-tinta">{roteiro.destino}</h3>
        <p className="text-aux text-tinta-2">
          {plural(roteiro.dias, 'dia', 'dias')} · {roteiro.tribo}
        </p>
        <p className="mt-auto flex items-center justify-between gap-2 border-t border-borda pt-3 text-aux text-tinta-2">
          <span className="inline-flex items-center gap-1" aria-label={plural(numComentarios, 'comentário', 'comentários')}>
            <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
            <span aria-hidden>{numComentarios}</span>
          </span>
          <span className="whitespace-nowrap">
            <span className="sr-only">Atualizado em </span>
            {formatarData(roteiro.atualizadoEm)}
          </span>
        </p>
      </div>
    </Link>
  );
}
