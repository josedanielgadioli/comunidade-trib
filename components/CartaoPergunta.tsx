import { CircleHelp } from 'lucide-react';
import { BotaoLink } from '@/components/ui/Botao';
import { Selo } from '@/components/ui/Selo';
import type { Comentario } from '@/lib/tipos';

export function CartaoPergunta({ pergunta, destino }: { pergunta: Comentario; destino: string }) {
  return (
    <article
      aria-label={`Pergunta de ${pergunta.autorNome}`}
      className="flex w-full flex-col gap-2 rounded-cartao bg-pergunta-fundo p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <CircleHelp size={24} strokeWidth={1.75} aria-hidden className="text-pergunta-texto" />
        {pergunta.exemplo && <Selo variante="exemplo" />}
      </div>
      <p className="line-clamp-3 text-corpo text-tinta">{pergunta.texto}</p>
      <p className="text-[12px] leading-4 text-tinta-2">{destino}</p>
      <BotaoLink
        variante="secundario"
        tamanho="compacto"
        href={`/roteiro/${pergunta.roteiroId}?responder=${pergunta.id}`}
        className="mt-auto self-start"
        aria-label={`Responder: ${pergunta.texto}`}
      >
        Responder
      </BotaoLink>
    </article>
  );
}
