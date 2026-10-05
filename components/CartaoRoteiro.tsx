import { CalendarDays, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { ImagemPlaceholder } from '@/components/ImagemPlaceholder';
import { Selo, SeloTribo } from '@/components/ui/Selo';
import { formatarData, plural } from '@/lib/formatar';
import type { Roteiro } from '@/lib/tipos';

export function CartaoRoteiro({ roteiro, numComentarios }: { roteiro: Roteiro; numComentarios: number }) {
  return (
    <Link
      href={`/roteiro/${roteiro.id}`}
      className="block overflow-hidden rounded-cartao border border-borda bg-branco active:bg-dica-fundo"
    >
      <ImagemPlaceholder tribo={roteiro.tribo} altura="h-28" />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2">
          {roteiro.curadoria && <Selo variante="curadoria" />}
          <SeloTribo tribo={roteiro.tribo} />
          {roteiro.exemplo && <Selo variante="exemplo" />}
        </div>
        <h3 className="text-cartao text-tinta">{roteiro.destino}</h3>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-aux text-tinta-2">
          <span>{plural(roteiro.dias, 'dia', 'dias')}</span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
            {plural(numComentarios, 'comentário', 'comentários')}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={20} strokeWidth={1.75} aria-hidden />
            Atualizado em {formatarData(roteiro.atualizadoEm)}
          </span>
        </p>
      </div>
    </Link>
  );
}
