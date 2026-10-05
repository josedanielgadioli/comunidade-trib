'use client';

import { PencilLine } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CabecalhoMarca } from '@/components/Cabecalho';
import { CartaoRoteiro } from '@/components/CartaoRoteiro';
import { Abas } from '@/components/ui/Abas';
import { BotaoLink } from '@/components/ui/Botao';
import { CampoTexto } from '@/components/ui/Campo';
import { Cartao } from '@/components/ui/Cartao';
import { Chips } from '@/components/ui/Chips';
import { EstadoVazio } from '@/components/ui/EstadoVazio';
import { Selo } from '@/components/ui/Selo';
import { useConsulta } from '@/lib/ContextoApp';
import { maisNovoPrimeiro, normalizar, semResposta } from '@/lib/comentarios';
import { formatarMesAno } from '@/lib/formatar';
import { TRIBOS, type Tribo } from '@/lib/tipos';

type Aba = 'destaques' | 'roteiros' | 'relatos';
type FiltroTribo = Tribo | 'todas';

const abas: { valor: Aba; rotulo: string }[] = [
  { valor: 'destaques', rotulo: 'Destaques' },
  { valor: 'roteiros', rotulo: 'Roteiros' },
  { valor: 'relatos', rotulo: 'Relatos recentes' },
];

const chipsTribo: { valor: FiltroTribo; rotulo: string }[] = [
  { valor: 'todas', rotulo: 'Todas' },
  ...TRIBOS.map((t) => ({ valor: t, rotulo: t })),
];

export default function Home() {
  const roteiros = useConsulta((f) => f.listarRoteiros(), []) ?? [];
  const comentarios = useConsulta((f) => f.listarComentarios(), []) ?? [];

  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState<Aba>('destaques');
  const [tribo, setTribo] = useState<FiltroTribo>('todas');

  const termo = normalizar(busca);
  const destinoDe = useMemo(() => Object.fromEntries(roteiros.map((r) => [r.id, r.destino])), [roteiros]);
  const combina = (roteiroId: string) => !termo || normalizar(destinoDe[roteiroId] ?? '').includes(termo);

  const visiveis = roteiros.filter((r) => combina(r.id));
  const contagem = (id: string) => comentarios.filter((c) => c.roteiroId === id).length;

  const destaques = visiveis.filter((r) => r.curadoria);
  const porTribo = visiveis.filter((r) => tribo === 'todas' || r.tribo === tribo);
  const relatos = comentarios
    .filter((c) => c.tipo === 'relato' && c.respostaA === null && combina(c.roteiroId))
    .sort(maisNovoPrimeiro);
  const perguntasAbertas = comentarios
    .filter((c) => semResposta(c, comentarios) && combina(c.roteiroId))
    .sort(maisNovoPrimeiro);

  const listaRoteiros = (lista: typeof roteiros) =>
    lista.length ? (
      <ul className="flex flex-col gap-3">
        {lista.map((r) => (
          <li key={r.id}>
            <CartaoRoteiro roteiro={r} numComentarios={contagem(r.id)} />
          </li>
        ))}
      </ul>
    ) : (
      <EstadoVazio />
    );

  return (
    <main className="flex flex-col gap-6 px-4 pb-[calc(120px+var(--area-segura))]">
      <CabecalhoMarca />

      <Link
        href="/contribuir"
        className="flex min-h-12 items-center gap-3 rounded-campo border border-borda bg-branco px-4 text-corpo text-tinta-2 hover:border-bordo"
      >
        <PencilLine size={20} strokeWidth={1.75} aria-hidden className="shrink-0 text-bordo" />
        Compartilhe sua experiência…
      </Link>

      <CampoTexto
        id="busca"
        type="search"
        rotulo="Buscar destino"
        placeholder="Ex.: Aparecida"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <section className="flex flex-col gap-3" aria-label="Roteiros e relatos">
        <Abas id="home" rotulo="Seções da comunidade" opcoes={abas} valor={aba} aoMudar={setAba} />

        <div id="home-painel" role="tabpanel" aria-labelledby={`home-aba-${aba}`} className="flex flex-col gap-3">
          {aba === 'destaques' && listaRoteiros(destaques)}

          {aba === 'roteiros' && (
            <>
              <Chips rotulo="Filtrar por tribo" opcoes={chipsTribo} valor={tribo} aoMudar={setTribo} />
              {listaRoteiros(porTribo)}
            </>
          )}

          {aba === 'relatos' &&
            (relatos.length ? (
              <ul className="flex flex-col gap-3">
                {relatos.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/roteiro/${c.roteiroId}`}
                      className="flex flex-col gap-2 rounded-cartao border border-borda bg-branco p-4 active:bg-dica-fundo"
                    >
                      <div className="flex flex-wrap gap-2">
                        <Selo variante="relato" />
                        {c.exemplo && <Selo variante="exemplo" />}
                      </div>
                      <p className="text-cartao text-tinta">{destinoDe[c.roteiroId]}</p>
                      <p className="text-corpo text-tinta">{c.texto}</p>
                      <p className="text-aux text-tinta-2">
                        {c.autorNome}
                        {c.quandoFoi && ` · foi em ${formatarMesAno(c.quandoFoi)}`}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EstadoVazio />
            ))}
        </div>
      </section>

      <section aria-labelledby="titulo-sem-resposta" className="flex flex-col gap-3">
        <h2 id="titulo-sem-resposta" className="text-secao text-tinta">
          Perguntas sem resposta
        </h2>
        {perguntasAbertas.length ? (
          <ul className="flex flex-col gap-3">
            {perguntasAbertas.map((c) => (
              <li key={c.id}>
                <Cartao className="flex flex-col gap-2 p-4">
                  <div className="flex flex-wrap gap-2">
                    <Selo variante="pergunta" />
                    {c.exemplo && <Selo variante="exemplo" />}
                  </div>
                  <p className="text-corpo text-tinta">{c.texto}</p>
                  <p className="text-aux text-tinta-2">
                    {c.autorNome} · {destinoDe[c.roteiroId]}
                  </p>
                  <BotaoLink
                    variante="secundario"
                    href={`/roteiro/${c.roteiroId}?responder=${c.id}`}
                    className="self-start"
                    aria-label={`Responder: ${c.texto}`}
                  >
                    Responder
                  </BotaoLink>
                </Cartao>
              </li>
            ))}
          </ul>
        ) : (
          <EstadoVazio />
        )}
      </section>
    </main>
  );
}
