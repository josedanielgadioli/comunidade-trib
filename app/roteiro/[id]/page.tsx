'use client';

import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Ilustracao } from '@/components/ilustracoes/Ilustracao';
import { ItemComentario } from '@/components/ItemComentario';
import { BotaoLink } from '@/components/ui/Botao';
import { Cartao } from '@/components/ui/Cartao';
import { Chips } from '@/components/ui/Chips';
import { EstadoVazio } from '@/components/ui/EstadoVazio';
import { Selo, SeloTribo } from '@/components/ui/Selo';
import { useToast } from '@/components/ui/Toast';
import { useConsulta } from '@/lib/ContextoApp';
import { maisAntigoPrimeiro, maisNovoPrimeiro, semResposta } from '@/lib/comentarios';
import { formatarData, plural } from '@/lib/formatar';
import type { TipoComentario } from '@/lib/tipos';

type Filtro = 'todos' | TipoComentario;

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'pergunta', rotulo: 'Perguntas' },
  { valor: 'dica', rotulo: 'Dicas' },
  { valor: 'relato', rotulo: 'Relatos' },
];

function TelaRoteiro() {
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const novoId = params.get('novo');
  const responderId = params.get('responder');
  const mostrarToast = useToast();

  // undefined = carregando; null = não encontrado.
  const roteiro = useConsulta((f) => f.buscarRoteiro(id), [id]);
  const comentarios = useConsulta((f) => f.listarComentarios(id), [id]);

  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [respondendo, setRespondendo] = useState<string | null>(responderId);

  // Vindo de "Responder" ou de uma publicação: leva a pessoa até o comentário.
  const alvo = responderId ?? novoId;
  useEffect(() => {
    if (!alvo || !comentarios) return;
    const el = document.getElementById(`comentario-${alvo}`);
    el?.scrollIntoView({ block: 'start' });
  }, [alvo, comentarios]);

  if (roteiro === null) {
    return (
      <main className="flex flex-col gap-4 px-4 pt-8">
        <h1 className="text-tela text-tinta">Não encontramos esse roteiro</h1>
        <BotaoLink variante="texto" href="/comunidade" className="self-start">
          Ver roteiros
        </BotaoLink>
      </main>
    );
  }
  if (!roteiro || !comentarios) return <main className="min-h-screen" aria-busy="true" />;

  const respostasDe = (paiId: string) => comentarios.filter((c) => c.respostaA === paiId).sort(maisAntigoPrimeiro);

  // Ordem: o que acabou de ser publicado, perguntas sem resposta, depois o resto (mais novos primeiro).
  const principais = comentarios
    .filter((c) => c.respostaA === null && (filtro === 'todos' || c.tipo === filtro))
    .sort((a, b) => {
      if (a.id === novoId) return -1;
      if (b.id === novoId) return 1;
      const sa = semResposta(a, comentarios) ? 0 : 1;
      const sb = semResposta(b, comentarios) ? 0 : 1;
      return sa - sb || maisNovoPrimeiro(a, b);
    });

  const emBreve = () => mostrarToast('Disponível no MVP');
  const botaoSobreImagem =
    'flex h-11 w-11 items-center justify-center rounded-full bg-branco text-tinta shadow-leve active:bg-dica-fundo';

  return (
    <main>
      <div className="relative h-60">
        <Ilustracao cena={roteiro.tribo} />
        <Link
          href="/comunidade"
          aria-label="Voltar"
          className={`absolute left-4 top-4 ${botaoSobreImagem}`}
        >
          <ArrowLeft size={24} strokeWidth={1.75} aria-hidden />
        </Link>
        <div className="absolute right-4 top-4 flex gap-2">
          <button type="button" aria-label="Compartilhar" onClick={emBreve} className={botaoSobreImagem}>
            <Share2 size={24} strokeWidth={1.75} aria-hidden />
          </button>
          <button type="button" aria-label="Salvar" onClick={emBreve} className={botaoSobreImagem}>
            <Bookmark size={24} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      {/* Conteúdo num cartão branco que sobe 24 px sobre a ilustração. */}
      <div className="relative -mt-6 flex min-h-[60vh] flex-col gap-6 rounded-t-[24px] bg-branco px-4 pb-[calc(120px+var(--area-segura))] pt-6">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {roteiro.curadoria && <Selo variante="curadoria" />}
            <SeloTribo tribo={roteiro.tribo} />
            {roteiro.exemplo && <Selo variante="exemplo" />}
          </div>
          <h1 className="text-tela text-tinta">{roteiro.destino}</h1>
          <p className="text-aux text-tinta-2">
            {plural(roteiro.dias, 'dia', 'dias')} · Atualizado em {formatarData(roteiro.atualizadoEm)}
          </p>
          <button
            type="button"
            onClick={emBreve}
            className="-my-2 flex min-h-11 self-start items-center text-aux text-tinta-2 underline-offset-4 hover:underline focus-visible:underline"
          >
            Usar e editar este roteiro · em breve
          </button>
        </header>

        <section aria-labelledby="titulo-dias" className="flex flex-col gap-3">
          <h2 id="titulo-dias" className="text-secao text-tinta">
            Dia a dia
          </h2>
          <ol className="flex flex-col gap-3">
            {roteiro.resumoDias.map((d) => (
              <li key={d.dia}>
                <Cartao className="flex gap-3 p-4">
                  <span className="w-1 shrink-0 rounded-full bg-rosa" aria-hidden />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-cartao text-tinta">
                      Dia {d.dia} · {d.titulo}
                    </h3>
                    <p className="text-corpo text-tinta">{d.texto}</p>
                  </div>
                </Cartao>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="titulo-conversa" className="flex flex-col gap-3">
          <h2 id="titulo-conversa" className="text-secao text-tinta">
            Conversa dos viajantes
          </h2>
          <BotaoLink variante="secundario" href={`/contribuir?roteiro=${roteiro.id}`} className="h-12 w-full">
            Contribuir neste roteiro
          </BotaoLink>

          <Chips rotulo="Filtrar conversa" opcoes={filtros} valor={filtro} aoMudar={setFiltro} />

          {principais.length ? (
            <ul className="flex flex-col gap-3">
              {principais.map((c) => (
                <li key={c.id}>
                  <ItemComentario
                    comentario={c}
                    respostas={respostasDe(c.id)}
                    semResposta={semResposta(c, comentarios)}
                    destacado={c.id === novoId}
                    respondendo={respondendo === c.id}
                    aoResponder={() => setRespondendo(c.id)}
                    aoFecharResposta={() => setRespondendo(null)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <EstadoVazio />
          )}
        </section>
      </div>
    </main>
  );
}

export default function PaginaRoteiro() {
  return (
    <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
      <TelaRoteiro />
    </Suspense>
  );
}
