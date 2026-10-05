'use client';

import { PencilLine } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Avatar } from '@/components/Avatar';
import { CartaoPergunta } from '@/components/CartaoPergunta';
import { CartaoRoteiro } from '@/components/CartaoRoteiro';
import { FileiraHorizontal, ItemFileira } from '@/components/FileiraHorizontal';
import { LogoSlot } from '@/components/LogoSlot';
import { Abas } from '@/components/ui/Abas';
import { CampoBusca } from '@/components/ui/Campo';
import { Chips } from '@/components/ui/Chips';
import { EstadoVazio } from '@/components/ui/EstadoVazio';
import { Selo } from '@/components/ui/Selo';
import { useApp, useConsulta } from '@/lib/ContextoApp';
import { maisNovoPrimeiro, normalizar, semResposta } from '@/lib/comentarios';
import { formatarMesAno } from '@/lib/formatar';
import { TRIBOS, type Roteiro, type Tribo } from '@/lib/tipos';

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
  const { nome } = useApp();
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

  const cartao = (r: Roteiro) => <CartaoRoteiro roteiro={r} numComentarios={contagem(r.id)} />;

  return (
    <main className="flex flex-col gap-6 px-4 pb-[calc(120px+var(--area-segura))]">
      <header className="flex flex-col gap-1 pt-4">
        <p className="mb-2 flex items-center gap-2 text-aux font-semibold text-bordo">
          <LogoSlot />
          Comunidade Trib
        </p>
        <h1 className="text-tela text-tinta">Olá, {nome || 'viajante'}</h1>
        <p className="text-aux text-tinta-2">Que tal descobrir uma nova viagem?</p>
      </header>

      <CampoBusca
        rotulo="Buscar destino"
        placeholder="Busque um destino"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <Link
        href="/contribuir"
        className="flex min-h-12 items-center gap-3 rounded-cartao border border-borda bg-branco px-3 py-2 hover:border-bordo active:bg-dica-fundo"
      >
        <Avatar nome={nome} />
        <span className="flex-1 text-corpo text-tinta-2">Compartilhe sua experiência…</span>
        <PencilLine size={20} strokeWidth={1.75} aria-hidden className="shrink-0 text-bordo" />
      </Link>

      <section className="flex flex-col gap-4" aria-label="Roteiros e relatos">
        <Abas id="home" rotulo="Seções da comunidade" opcoes={abas} valor={aba} aoMudar={setAba} />

        <div id="home-painel" role="tabpanel" aria-labelledby={`home-aba-${aba}`} className="flex flex-col gap-6">
          {aba === 'destaques' && (
            <>
              <section aria-labelledby="titulo-curadoria" className="flex flex-col gap-3">
                <div>
                  <h2 id="titulo-curadoria" className="text-secao text-tinta">
                    Curadoria Trib
                  </h2>
                  <p className="text-aux text-tinta-2">Roteiros escolhidos pela nossa equipe</p>
                </div>
                {destaques.length ? (
                  <FileiraHorizontal rotulo="Roteiros com curadoria">
                    {destaques.map((r) => (
                      <ItemFileira key={r.id} largura="w-60">
                        {cartao(r)}
                      </ItemFileira>
                    ))}
                  </FileiraHorizontal>
                ) : (
                  <EstadoVazio />
                )}
              </section>

              <section aria-labelledby="titulo-sem-resposta" className="flex flex-col gap-3">
                <h2 id="titulo-sem-resposta" className="text-secao text-tinta">
                  Perguntas sem resposta
                </h2>
                {perguntasAbertas.length ? (
                  <FileiraHorizontal rotulo="Perguntas sem resposta">
                    {perguntasAbertas.map((c) => (
                      <ItemFileira key={c.id} largura="w-[280px]">
                        <CartaoPergunta pergunta={c} destino={destinoDe[c.roteiroId] ?? ''} />
                      </ItemFileira>
                    ))}
                  </FileiraHorizontal>
                ) : (
                  <EstadoVazio />
                )}
              </section>
            </>
          )}

          {aba === 'roteiros' && (
            <div className="flex flex-col gap-3">
              <Chips rotulo="Filtrar por tribo" opcoes={chipsTribo} valor={tribo} aoMudar={setTribo} />
              {porTribo.length ? (
                <ul className="flex flex-col gap-3">
                  {porTribo.map((r) => (
                    <li key={r.id}>{cartao(r)}</li>
                  ))}
                </ul>
              ) : (
                <EstadoVazio />
              )}
            </div>
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
                      <div className="flex items-center gap-2">
                        <Avatar nome={c.autorNome} />
                        <div className="flex min-w-0 flex-col">
                          <span className="text-aux font-semibold text-tinta">{c.autorNome}</span>
                          {c.quandoFoi && (
                            <span className="text-aux text-tinta-2">foi em {formatarMesAno(c.quandoFoi)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Selo variante="relato" />
                        {c.exemplo && <Selo variante="exemplo" />}
                      </div>
                      <p className="text-cartao text-tinta">{destinoDe[c.roteiroId]}</p>
                      <p className="line-clamp-3 text-corpo text-tinta">{c.texto}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EstadoVazio />
            ))}
        </div>
      </section>
    </main>
  );
}
