'use client';

import { CircleHelp } from 'lucide-react';
import { RespostaInline } from '@/components/RespostaInline';
import { Botao } from '@/components/ui/Botao';
import { Selo, SeloTipo } from '@/components/ui/Selo';
import { formatarData, formatarMesAno } from '@/lib/formatar';
import type { Comentario } from '@/lib/tipos';

function Meta({ c }: { c: Comentario }) {
  return (
    <p className="text-aux text-tinta-2">
      {c.autorNome} · <time dateTime={c.criadoEm}>{formatarData(c.criadoEm)}</time>
      {c.tipo === 'relato' && c.quandoFoi && ` · foi em ${formatarMesAno(c.quandoFoi)}`}
    </p>
  );
}

interface Props {
  comentario: Comentario;
  respostas: Comentario[];
  semResposta: boolean;
  destacado: boolean;
  respondendo: boolean;
  aoResponder: () => void;
  aoFecharResposta: () => void;
}

export function ItemComentario({
  comentario: c,
  respostas,
  semResposta,
  destacado,
  respondendo,
  aoResponder,
  aoFecharResposta,
}: Props) {
  return (
    <article
      id={`comentario-${c.id}`}
      aria-label={`${c.tipo === 'pergunta' ? 'Pergunta' : c.tipo === 'dica' ? 'Dica' : 'Relato'} de ${c.autorNome}`}
      className={`scroll-mt-4 rounded-cartao bg-branco p-4 ${destacado ? 'border-2 border-rosa' : 'border border-borda'}`}
    >
      {semResposta && (
        <p className="mb-3 flex items-center gap-2 rounded-campo bg-pergunta-fundo px-3 py-2 text-aux font-semibold text-pergunta-texto">
          <CircleHelp size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
          Sem resposta ainda · você já foi?
        </p>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <SeloTipo tipo={c.tipo} />
          {c.exemplo && <Selo variante="exemplo" />}
        </div>
        <p className="text-corpo text-tinta">{c.texto}</p>
        <Meta c={c} />
      </div>

      {!respondendo && (
        <Botao variante="texto" onClick={aoResponder} aria-expanded={false} className="-ml-2 mt-1">
          Responder
        </Botao>
      )}

      {respondendo && <RespostaInline pai={c} aoFechar={aoFecharResposta} />}

      {respostas.length > 0 && (
        <ul className="ml-2 mt-3 flex flex-col gap-3 border-l-2 border-borda pl-4" aria-label="Respostas">
          {respostas.map((r) => (
            <li key={r.id} id={`comentario-${r.id}`} className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <SeloTipo tipo={r.tipo} resposta />
                {r.exemplo && <Selo variante="exemplo" />}
              </div>
              <p className="text-corpo text-tinta">{r.texto}</p>
              <Meta c={r} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
