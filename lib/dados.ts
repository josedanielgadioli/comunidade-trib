import { comentariosExemplo, notificacoesExemplo, roteirosExemplo } from '@/data/exemplo';
import type { Comentario, NovoComentario, Notificacao, Roteiro } from '@/lib/tipos';

/**
 * Contrato da camada de dados. As telas só conhecem estas funções.
 * Para trocar pelo Supabase, crie outra implementação deste contrato
 * (ex.: lib/dados-supabase.ts) e troque a fonte em lib/ContextoApp.tsx.
 */
export interface FonteDados {
  listarRoteiros(): Promise<Roteiro[]>;
  buscarRoteiro(id: string): Promise<Roteiro | null>;
  /** Sem roteiroId, devolve os comentários de todos os roteiros. */
  listarComentarios(roteiroId?: string): Promise<Comentario[]>;
  publicarComentario(novo: NovoComentario): Promise<Comentario>;
  listarNotificacoes(): Promise<Notificacao[]>;
}

/**
 * Fonte local: conteúdo de exemplo + contribuições guardadas no estado do app.
 * As contribuições somem ao recarregar a página (comportamento esperado).
 */
export function criarFonteLocal(
  lerNovos: () => Comentario[],
  guardarNovo: (comentario: Comentario) => void,
): FonteDados {
  const todos = () => [...lerNovos(), ...comentariosExemplo];

  return {
    async listarRoteiros() {
      return roteirosExemplo;
    },
    async buscarRoteiro(id) {
      return roteirosExemplo.find((r) => r.id === id) ?? null;
    },
    async listarComentarios(roteiroId) {
      const lista = todos();
      return roteiroId ? lista.filter((c) => c.roteiroId === roteiroId) : lista;
    },
    async publicarComentario(novo) {
      const comentario: Comentario = {
        ...novo,
        quandoFoi: novo.tipo === 'relato' ? novo.quandoFoi : null,
        id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        criadoEm: new Date().toISOString(),
        exemplo: false,
      };
      guardarNovo(comentario);
      return comentario;
    },
    async listarNotificacoes() {
      return notificacoesExemplo;
    },
  };
}
