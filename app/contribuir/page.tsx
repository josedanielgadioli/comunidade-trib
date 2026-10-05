'use client';

import { BookOpen, CircleAlert, CircleHelp, Lightbulb, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, type FormEvent } from 'react';
import { BarraAcao } from '@/components/BarraAcao';
import { CabecalhoVoltar } from '@/components/Cabecalho';
import { ERRO_NOME_VAZIO, ERRO_TEXTO_VAZIO } from '@/components/RespostaInline';
import { Botao } from '@/components/ui/Botao';
import { CampoAreaTexto, CampoSelecao, CampoTexto } from '@/components/ui/Campo';
import { Cartao } from '@/components/ui/Cartao';
import { useToast } from '@/components/ui/Toast';
import { useApp, useConsulta } from '@/lib/ContextoApp';
import { NOMES_MESES } from '@/lib/formatar';
import type { TipoComentario } from '@/lib/tipos';

const tipos: { valor: TipoComentario; rotulo: string; Icone: LucideIcon; campo: string }[] = [
  { valor: 'pergunta', rotulo: 'Perguntar', Icone: CircleHelp, campo: 'Sua pergunta' },
  { valor: 'dica', rotulo: 'Dar uma dica', Icone: Lightbulb, campo: 'Sua dica' },
  { valor: 'relato', rotulo: 'Contar como foi', Icone: BookOpen, campo: 'Seu relato' },
];

const ANO_ATUAL = 2026;
const anos = Array.from({ length: 7 }, (_, i) => String(ANO_ATUAL - i));

type Erros = Partial<Record<'roteiro' | 'nome' | 'quando' | 'texto', string>>;

function TelaContribuir() {
  const router = useRouter();
  const params = useSearchParams();
  const roteiroFixo = params.get('roteiro');
  const { nome, definirNome, fonte } = useApp();
  const mostrarToast = useToast();

  const roteiros = useConsulta((f) => f.listarRoteiros(), []);

  const [roteiroId, setRoteiroId] = useState(roteiroFixo ?? '');
  const [tipo, setTipo] = useState<TipoComentario>('pergunta');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [texto, setTexto] = useState('');
  const [nomeLocal, setNomeLocal] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);

  const roteiroAtual = roteiros?.find((r) => r.id === roteiroFixo);
  const config = tipos.find((t) => t.valor === tipo)!;

  async function publicar(e: FormEvent) {
    e.preventDefault();
    const novos: Erros = {
      roteiro: !roteiroId ? 'Escolha um roteiro.' : undefined,
      nome: !nome && !nomeLocal.trim() ? ERRO_NOME_VAZIO : undefined,
      quando: tipo === 'relato' && (!mes || !ano) ? 'Conta pra gente quando você foi.' : undefined,
      texto: !texto.trim() ? ERRO_TEXTO_VAZIO : undefined,
    };
    setErros(novos);
    const primeiro = (['roteiro', 'nome', 'quando', 'texto'] as const).find((k) => novos[k]);
    if (primeiro) {
      const alvo = { roteiro: 'roteiro', nome: 'nome', quando: 'quando-mes', texto: 'texto' }[primeiro];
      document.getElementById(alvo)?.focus();
      return;
    }

    const autor = nome || nomeLocal.trim();
    if (!nome) definirNome(autor);

    setEnviando(true);
    const comentario = await fonte.publicarComentario({
      roteiroId,
      tipo,
      texto: texto.trim(),
      quandoFoi: tipo === 'relato' ? `${ano}-${mes}` : null,
      autorNome: autor,
      respostaA: null,
    });
    mostrarToast('Publicado. Valeu por compartilhar.', 'sucesso');
    router.replace(`/roteiro/${roteiroId}?novo=${comentario.id}`);
  }

  return (
    <main className="px-4 pb-36">
      <CabecalhoVoltar titulo="Contribuir" voltarPara={roteiroFixo ? `/roteiro/${roteiroFixo}` : '/comunidade'} />

      <form onSubmit={publicar} noValidate className="mt-6 flex flex-col gap-6">
        {roteiroFixo ? (
          <p className="text-corpo text-tinta-2">
            Sobre <span className="font-semibold text-tinta">{roteiroAtual?.destino ?? '…'}</span>
          </p>
        ) : (
          <CampoSelecao
            id="roteiro"
            rotulo="Sobre qual roteiro?"
            value={roteiroId}
            erro={erros.roteiro}
            onChange={(e) => setRoteiroId(e.target.value)}
          >
            <option value="">Escolha um roteiro</option>
            {roteiros?.map((r) => (
              <option key={r.id} value={r.id}>
                {r.destino}
              </option>
            ))}
          </CampoSelecao>
        )}

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-corpo font-semibold text-tinta">O que você quer compartilhar?</legend>
          <div className="grid grid-cols-3 gap-2">
            {tipos.map(({ valor, rotulo, Icone }) => {
              const marcado = tipo === valor;
              return (
                <label key={valor} className="cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value={valor}
                    checked={marcado}
                    onChange={() => setTipo(valor)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-campo px-2 py-2 text-center text-aux text-tinta peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bordo ${
                      marcado ? 'bg-rosa-claro font-semibold' : 'border border-borda bg-branco'
                    }`}
                  >
                    <Icone size={20} strokeWidth={1.75} aria-hidden />
                    {rotulo}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

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
              <CampoSelecao
                id="quando-mes"
                rotulo="Mês"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              >
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
            {erros.quando && (
              <p id="quando-erro" className="flex items-start gap-1 text-aux font-medium text-bordo">
                <CircleAlert size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
                <span>{erros.quando}</span>
              </p>
            )}
          </fieldset>
        )}

        <CampoAreaTexto
          id="texto"
          rotulo={config.campo}
          rows={5}
          placeholder="Onde estacionou? Quanto gastou? O que não faria de novo?"
          value={texto}
          erro={erros.texto}
          onChange={(e) => {
            setTexto(e.target.value);
            if (erros.texto) setErros((x) => ({ ...x, texto: undefined }));
          }}
        />

        <Cartao className="flex gap-3 p-4">
          <ShieldCheck size={24} strokeWidth={1.75} aria-hidden className="shrink-0 text-verde" />
          <div className="flex flex-col gap-1">
            <h2 className="text-cartao text-tinta">Nossas regras</h2>
            <p className="text-aux text-tinta-2">Respeito sempre, fale do que você viveu, sem propaganda.</p>
          </div>
        </Cartao>

        <BarraAcao>
          <Botao type="submit" desabilitado={enviando}>
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
