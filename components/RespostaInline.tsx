'use client';

import { useState, type FormEvent } from 'react';
import { Botao } from '@/components/ui/Botao';
import { CampoAreaTexto, CampoTexto } from '@/components/ui/Campo';
import { useToast } from '@/components/ui/Toast';
import { useApp } from '@/lib/ContextoApp';
import type { Comentario } from '@/lib/tipos';

export const ERRO_TEXTO_VAZIO = 'Conta pra gente o que você quer compartilhar.';
export const ERRO_NOME_VAZIO = 'Conta pra gente seu primeiro nome.';

export function RespostaInline({ pai, aoFechar }: { pai: Comentario; aoFechar: () => void }) {
  const { nome, definirNome, fonte } = useApp();
  const mostrarToast = useToast();
  const [texto, setTexto] = useState('');
  const [nomeLocal, setNomeLocal] = useState('');
  const [erros, setErros] = useState<{ texto?: string; nome?: string }>({});
  const [enviando, setEnviando] = useState(false);

  const idTexto = `resposta-${pai.id}`;
  const idNome = `resposta-nome-${pai.id}`;

  async function publicar(e: FormEvent) {
    e.preventDefault();
    const novosErros = {
      nome: !nome && !nomeLocal.trim() ? ERRO_NOME_VAZIO : undefined,
      texto: !texto.trim() ? ERRO_TEXTO_VAZIO : undefined,
    };
    setErros(novosErros);
    if (novosErros.nome || novosErros.texto) {
      document.getElementById(novosErros.nome ? idNome : idTexto)?.focus();
      return;
    }
    const autor = nome || nomeLocal.trim();
    if (!nome) definirNome(autor);

    setEnviando(true);
    await fonte.publicarComentario({
      roteiroId: pai.roteiroId,
      tipo: 'dica',
      texto: texto.trim(),
      quandoFoi: null,
      autorNome: autor,
      respostaA: pai.id,
    });
    setEnviando(false);
    mostrarToast('Publicado. Valeu por compartilhar.', 'sucesso');
    aoFechar();
  }

  return (
    <form onSubmit={publicar} noValidate className="mt-3 flex flex-col gap-3 border-t border-borda pt-3">
      {!nome && (
        <CampoTexto
          id={idNome}
          rotulo="Seu primeiro nome"
          autoComplete="given-name"
          value={nomeLocal}
          erro={erros.nome}
          onChange={(e) => setNomeLocal(e.target.value)}
        />
      )}
      <CampoAreaTexto
        id={idTexto}
        rotulo="Sua resposta"
        rows={3}
        autoFocus
        value={texto}
        erro={erros.texto}
        onChange={(e) => {
          setTexto(e.target.value);
          if (erros.texto) setErros((x) => ({ ...x, texto: undefined }));
        }}
      />
      <div className="flex items-center gap-2">
        <Botao type="submit" variante="secundario" desabilitado={enviando}>
          Publicar resposta
        </Botao>
        <Botao variante="texto" onClick={aoFechar}>
          Cancelar
        </Botao>
      </div>
    </form>
  );
}
