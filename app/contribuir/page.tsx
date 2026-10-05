'use client';

import { BookOpen, CircleAlert, CircleCheck, CircleHelp, Lightbulb, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, type FormEvent, type ReactNode } from 'react';
import { BarraAcao } from '@/components/BarraAcao';
import { CabecalhoVoltar } from '@/components/Cabecalho';
import { Foto } from '@/components/Foto';
import { ERRO_NOME_VAZIO, ERRO_TEXTO_VAZIO } from '@/components/RespostaInline';
import { Botao } from '@/components/ui/Botao';
import { CampoAreaTexto, CampoSelecao, CampoTexto } from '@/components/ui/Campo';
import { useToast } from '@/components/ui/Toast';
import { useApp, useConsulta } from '@/lib/ContextoApp';
import { NOMES_MESES, plural } from '@/lib/formatar';
import type { Roteiro, TipoComentario } from '@/lib/tipos';

const MINIMO = 10;

const tipos: { valor: TipoComentario; rotulo: string; descricao: string; Icone: LucideIcon; campo: string; dica: string }[] = [
  {
    valor: 'pergunta',
    rotulo: 'Perguntar',
    descricao: 'Tire uma dúvida com quem já foi',
    Icone: CircleHelp,
    campo: 'Sua pergunta',
    dica: 'Ex.: Dá para fazer de carro baixo? Onde abastecer?',
  },
  {
    valor: 'dica',
    rotulo: 'Dar uma dica',
    descricao: 'Algo que ajuda quem vai',
    Icone: Lightbulb,
    campo: 'Sua dica',
    dica: 'Ex.: Onde estacionou, quanto gastou, o que levar.',
  },
  {
    valor: 'relato',
    rotulo: 'Contar como foi',
    descricao: 'Sua experiência nesse roteiro',
    Icone: BookOpen,
    campo: 'Seu relato',
    dica: 'Onde estacionou? Quanto gastou? O que não faria de novo?',
  },
];

const ANO_ATUAL = 2026;
const anos = Array.from({ length: 7 }, (_, i) => String(ANO_ATUAL - i));

type Erros = Partial<Record<'roteiro' | 'tipo' | 'nome' | 'quando' | 'texto', string>>;

function Miniatura({ roteiro, tamanho }: { roteiro: Roteiro; tamanho: string }) {
  return (
    <span className={`shrink-0 overflow-hidden rounded-campo ${tamanho}`}>
      <Foto src={roteiro.imagem.src} alt="" reserva={roteiro.tribo} sizes="56px" />
    </span>
  );
}

function MensagemErro({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1 text-aux font-medium text-bordo">
      <CircleAlert size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Cartão de opção (rádio nativo escondido): borda 2 px bordo e fundo dica-fundo quando marcado. */
function classeOpcao(marcada: boolean) {
  return `flex items-center gap-3 rounded-cartao text-left peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bordo ${
    marcada ? 'border-2 border-bordo bg-dica-fundo p-[15px]' : 'border border-borda bg-branco p-4'
  }`;
}

function TelaContribuir() {
  const router = useRouter();
  const params = useSearchParams();
  const roteiroFixo = params.get('roteiro');
  const { nome, definirNome, fonte } = useApp();
  const mostrarToast = useToast();

  const roteiros = useConsulta((f) => f.listarRoteiros(), []);

  const [roteiroId, setRoteiroId] = useState(roteiroFixo ?? '');
  const [trocando, setTrocando] = useState(false);
  const [tipo, setTipo] = useState<TipoComentario | null>(null);
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [texto, setTexto] = useState('');
  const [nomeLocal, setNomeLocal] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);

  const roteiro = roteiros?.find((r) => r.id === roteiroId);
  // O seletor aparece se veio sem roteiro (ou com um que não existe) ou se a pessoa tocou em "Trocar".
  const mostrarSeletor = trocando || (roteiros !== undefined && !roteiro);
  const config = tipos.find((t) => t.valor === tipo);
  const caracteres = texto.trim().length;

  function validar(): Erros {
    return {
      roteiro: !roteiro ? 'Escolha um roteiro.' : undefined,
      tipo: !tipo ? 'Escolha o que você quer compartilhar.' : undefined,
      nome: tipo && !nome && !nomeLocal.trim() ? ERRO_NOME_VAZIO : undefined,
      quando: tipo === 'relato' && (!mes || !ano) ? 'Conta pra gente quando você foi.' : undefined,
      texto: !tipo
        ? undefined
        : caracteres === 0
          ? ERRO_TEXTO_VAZIO
          : caracteres < MINIMO
            ? `Escreva pelo menos ${MINIMO} caracteres.`
            : undefined,
    };
  }
  const valido = !Object.values(validar()).some(Boolean);

  async function publicar(e: FormEvent) {
    e.preventDefault();
    const novos = validar();
    setErros(novos);
    const primeiro = (['roteiro', 'tipo', 'nome', 'quando', 'texto'] as const).find((k) => novos[k]);
    if (primeiro) {
      const alvo = {
        roteiro: '#seletor-roteiro input',
        tipo: '#tipo-pergunta',
        nome: '#nome',
        quando: '#quando-mes',
        texto: '#texto',
      }[primeiro];
      document.querySelector<HTMLElement>(alvo)?.focus();
      return;
    }
    if (!tipo || !roteiro) return;

    const autor = nome || nomeLocal.trim();
    if (!nome) definirNome(autor);

    setEnviando(true);
    const comentario = await fonte.publicarComentario({
      roteiroId: roteiro.id,
      tipo,
      texto: texto.trim(),
      quandoFoi: tipo === 'relato' ? `${ano}-${mes}` : null,
      autorNome: autor,
      respostaA: null,
    });
    mostrarToast('Publicado. Valeu por compartilhar.', 'sucesso');
    router.replace(`/roteiro/${roteiro.id}?novo=${comentario.id}`);
  }

  return (
    <main className="px-4 pb-36">
      <CabecalhoVoltar titulo="Contribuir" voltarPara={roteiroFixo ? `/roteiro/${roteiroFixo}` : '/comunidade'} />

      <form onSubmit={publicar} noValidate className="mt-6 flex flex-col gap-6">
        {/* Roteiro */}
        {roteiros === undefined ? null : mostrarSeletor ? (
          <section aria-labelledby="titulo-roteiro" className="flex flex-col gap-3">
            <h2 id="titulo-roteiro" className="text-corpo font-semibold text-tinta">
              Sobre qual roteiro?
            </h2>
            <div id="seletor-roteiro" role="radiogroup" aria-labelledby="titulo-roteiro" className="flex flex-col gap-2">
              {roteiros.map((r) => {
                const marcado = r.id === roteiroId;
                return (
                  <label key={r.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="roteiro"
                      value={r.id}
                      checked={marcado}
                      onChange={() => {
                        setRoteiroId(r.id);
                        setTrocando(false);
                        setErros((x) => ({ ...x, roteiro: undefined }));
                      }}
                      // Tocar de novo no roteiro já marcado também fecha o seletor.
                      onClick={() => setTrocando(false)}
                      className="peer sr-only"
                    />
                    <span className={classeOpcao(marcado)}>
                      <Miniatura roteiro={r} tamanho="h-14 w-14" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-cartao text-tinta">{r.destino}</span>
                        <span className="text-aux text-tinta-2">
                          {plural(r.dias, 'dia', 'dias')} · {r.tribo}
                        </span>
                      </span>
                      {marcado && <CircleCheck size={24} strokeWidth={1.75} aria-hidden className="shrink-0 text-bordo" />}
                    </span>
                  </label>
                );
              })}
            </div>
            {erros.roteiro && <MensagemErro id="roteiro-erro">{erros.roteiro}</MensagemErro>}
          </section>
        ) : (
          roteiro && (
            <div className="flex items-center gap-3 rounded-cartao border border-borda bg-branco p-3">
              <Miniatura roteiro={roteiro} tamanho="h-14 w-14" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-aux text-tinta-2">Sobre</span>
                <span className="text-cartao text-tinta">{roteiro.destino}</span>
              </div>
              <Botao variante="texto" tamanho="compacto" onClick={() => setTrocando(true)} aria-label={`Trocar roteiro (${roteiro.destino})`}>
                Trocar
              </Botao>
            </div>
          )
        )}

        {/* Tipo */}
        <section aria-labelledby="titulo-tipo" className="flex flex-col gap-3">
          <h2 id="titulo-tipo" className="text-corpo font-semibold text-tinta">
            O que você quer compartilhar?
          </h2>
          <div role="radiogroup" aria-labelledby="titulo-tipo" className="flex flex-col gap-2">
            {tipos.map(({ valor, rotulo, descricao, Icone }) => {
              const marcado = tipo === valor;
              return (
                <label key={valor} className="cursor-pointer">
                  <input
                    id={`tipo-${valor}`}
                    type="radio"
                    name="tipo"
                    value={valor}
                    checked={marcado}
                    onChange={() => {
                      setTipo(valor);
                      setErros({});
                    }}
                    className="peer sr-only"
                  />
                  <span className={classeOpcao(marcado)}>
                    <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rosa-claro text-tinta">
                      <Icone size={20} strokeWidth={1.75} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-cartao text-tinta">{rotulo}</span>
                      <span className="text-aux text-tinta-2">{descricao}</span>
                    </span>
                    {marcado && <CircleCheck size={24} strokeWidth={1.75} aria-hidden className="shrink-0 text-bordo" />}
                  </span>
                </label>
              );
            })}
          </div>
          {erros.tipo && <MensagemErro id="tipo-erro">{erros.tipo}</MensagemErro>}
        </section>

        {/* O campo de texto só aparece depois de escolher o tipo. */}
        {config && (
          <>
            {!nome && (
              <CampoTexto
                id="nome"
                rotulo="Seu primeiro nome"
                autoComplete="given-name"
                value={nomeLocal}
                erro={erros.nome}
                onChange={(e) => setNomeLocal(e.target.value)}
              />
            )}

            {tipo === 'relato' && (
              <fieldset className="flex flex-col gap-2" aria-describedby={erros.quando ? 'quando-erro' : undefined}>
                <legend className="mb-2 text-corpo font-semibold text-tinta">Quando você foi?</legend>
                <div className="grid grid-cols-2 gap-3">
                  <CampoSelecao id="quando-mes" rotulo="Mês" value={mes} onChange={(e) => setMes(e.target.value)}>
                    <option value="">Mês</option>
                    {NOMES_MESES.map((m, i) => (
                      <option key={m} value={String(i + 1).padStart(2, '0')}>
                        {m[0].toUpperCase() + m.slice(1)}
                      </option>
                    ))}
                  </CampoSelecao>
                  <CampoSelecao id="quando-ano" rotulo="Ano" value={ano} onChange={(e) => setAno(e.target.value)}>
                    <option value="">Ano</option>
                    {anos.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </CampoSelecao>
                </div>
                {erros.quando && <MensagemErro id="quando-erro">{erros.quando}</MensagemErro>}
              </fieldset>
            )}

            <div className="flex flex-col gap-2">
              <CampoAreaTexto
                id="texto"
                rotulo={config.campo}
                rows={5}
                placeholder={config.dica}
                value={texto}
                erro={erros.texto}
                onChange={(e) => {
                  setTexto(e.target.value);
                  if (erros.texto) setErros((x) => ({ ...x, texto: undefined }));
                }}
              />
              <p className="text-right text-aux text-tinta-2">
                {plural(caracteres, 'caractere', 'caracteres')} · mínimo {MINIMO}
              </p>
            </div>
          </>
        )}

        <p className="flex items-start gap-2 text-aux text-tinta-2">
          <ShieldCheck size={20} strokeWidth={1.75} aria-hidden className="shrink-0 text-verde" />
          Lembrete: respeito sempre, fale do que você viveu, sem propaganda.
        </p>

        <BarraAcao>
          <Botao type="submit" desabilitado={enviando} aparenciaDesabilitada={!valido}>
            Publicar
          </Botao>
        </BarraAcao>
      </form>
    </main>
  );
}

export default function PaginaContribuir() {
  return (
    <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
      <TelaContribuir />
    </Suspense>
  );
}
