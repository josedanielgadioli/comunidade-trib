'use client';

import { BookOpen, CircleHelp, Map as Mapa } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { BarraAcao } from '@/components/BarraAcao';
import { ImagemPlaceholder } from '@/components/ImagemPlaceholder';
import { LogoSlot } from '@/components/LogoSlot';
import { Botao } from '@/components/ui/Botao';
import { CampoTexto } from '@/components/ui/Campo';
import { Cartao } from '@/components/ui/Cartao';
import { useApp } from '@/lib/ContextoApp';

const podeFazer = [
  { Icone: Mapa, texto: 'Encontrar roteiros curados' },
  { Icone: CircleHelp, texto: 'Perguntar a quem já foi' },
  { Icone: BookOpen, texto: 'Contar como foi sua viagem' },
];

const regras = ['Respeito sempre', 'Fale do que você viveu', 'Sem propaganda'];

export default function BoasVindas() {
  const router = useRouter();
  const { nome, definirNome } = useApp();
  const [valor, setValor] = useState(nome);
  const [erro, setErro] = useState('');

  function entrar(e: FormEvent) {
    e.preventDefault();
    if (!valor.trim()) {
      setErro('Conta pra gente seu primeiro nome.');
      document.getElementById('primeiro-nome')?.focus();
      return;
    }
    definirNome(valor);
    router.push('/comunidade');
  }

  return (
    <main className="pb-36">
      <ImagemPlaceholder altura="h-48" />

      <form onSubmit={entrar} noValidate className="flex flex-col gap-6 px-4 pt-6">
        <div className="flex items-center gap-2">
          <LogoSlot />
          <p className="text-corpo font-semibold text-bordo">Comunidade Trib</p>
        </div>

        <h1 className="text-tela text-tinta">Viajantes ajudando viajantes com experiências reais</h1>

        <section aria-labelledby="titulo-aqui" className="flex flex-col gap-3">
          <h2 id="titulo-aqui" className="text-secao text-tinta">
            Aqui você pode
          </h2>
          <ul className="flex flex-col gap-3">
            {podeFazer.map(({ Icone, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-corpo text-tinta">
                <Icone size={24} strokeWidth={1.75} aria-hidden className="shrink-0 text-rosa" />
                {texto}
              </li>
            ))}
          </ul>
        </section>

        <Cartao className="flex flex-col gap-2 p-4">
          <h2 className="text-secao text-tinta">Nossas regras</h2>
          <ul className="list-disc pl-5 text-corpo text-tinta marker:text-rosa">
            {regras.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Cartao>

        <CampoTexto
          id="primeiro-nome"
          rotulo="Seu primeiro nome"
          autoComplete="given-name"
          required
          aria-required
          value={valor}
          erro={erro}
          onChange={(e) => {
            setValor(e.target.value);
            if (erro) setErro('');
          }}
        />

        <BarraAcao>
          <Botao type="submit">Ver roteiros</Botao>
        </BarraAcao>
      </form>
    </main>
  );
}
