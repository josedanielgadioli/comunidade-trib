'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { criarFonteLocal, type FonteDados } from '@/lib/dados';
import { notificacoesExemplo } from '@/data/exemplo';
import type { Comentario } from '@/lib/tipos';

interface ValorContexto {
  nome: string;
  definirNome: (nome: string) => void;
  fonte: FonteDados;
  /** Muda a cada publicação, para as telas buscarem os dados de novo. */
  versao: number;
  /** Roteiros salvos nesta sessão (somem ao recarregar). */
  salvos: ReadonlySet<string>;
  /** Alterna salvo/não salvo e devolve o novo estado. */
  alternarSalvo: (roteiroId: string) => boolean;
  /** Notificações já lidas nesta sessão. */
  lidas: ReadonlySet<string>;
  marcarLidas: (ids: string[]) => void;
}

const ContextoApp = createContext<ValorContexto | null>(null);

export function ProvedorApp({ children }: { children: React.ReactNode }) {
  const [nome, setNome] = useState('');
  const [versao, setVersao] = useState(0);
  // Contribuições novas: vivem só no estado do app.
  const novos = useRef<Comentario[]>([]);

  const fonte = useMemo(
    () =>
      criarFonteLocal(
        () => novos.current,
        (comentario) => {
          novos.current = [comentario, ...novos.current];
          setVersao((v) => v + 1);
        },
      ),
    [],
  );

  const definirNome = useCallback((valor: string) => setNome(valor.trim()), []);

  const [salvos, setSalvos] = useState<ReadonlySet<string>>(new Set());
  const salvosRef = useRef(salvos);
  const alternarSalvo = useCallback((roteiroId: string) => {
    const proximo = new Set(salvosRef.current);
    const salvo = !proximo.has(roteiroId);
    if (salvo) proximo.add(roteiroId);
    else proximo.delete(roteiroId);
    salvosRef.current = proximo;
    setSalvos(proximo);
    return salvo;
  }, []);

  const [lidas, setLidas] = useState<ReadonlySet<string>>(
    () => new Set(notificacoesExemplo.filter((n) => n.lida).map((n) => n.id)),
  );
  const marcarLidas = useCallback((ids: string[]) => setLidas((atual) => new Set([...atual, ...ids])), []);

  const valor = useMemo(
    () => ({ nome, definirNome, fonte, versao, salvos, alternarSalvo, lidas, marcarLidas }),
    [nome, definirNome, fonte, versao, salvos, alternarSalvo, lidas, marcarLidas],
  );

  return <ContextoApp.Provider value={valor}>{children}</ContextoApp.Provider>;
}

export function useApp() {
  const valor = useContext(ContextoApp);
  if (!valor) throw new Error('useApp precisa estar dentro de ProvedorApp');
  return valor;
}

/** Roda uma consulta na fonte de dados e refaz quando algo é publicado. */
export function useConsulta<T>(consulta: (fonte: FonteDados) => Promise<T>, deps: unknown[]): T | undefined {
  const { fonte, versao } = useApp();
  const [resultado, setResultado] = useState<T>();

  useEffect(() => {
    let ativo = true;
    consulta(fonte).then((r) => {
      if (ativo) setResultado(r);
    });
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fonte, versao, ...deps]);

  return resultado;
}
