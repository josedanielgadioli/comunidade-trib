export type Tribo = 'Moto' | 'Religioso' | 'Fusca';

export const TRIBOS: Tribo[] = ['Moto', 'Religioso', 'Fusca'];

export type TipoComentario = 'pergunta' | 'dica' | 'relato';

export interface DiaResumo {
  dia: number;
  titulo: string;
  texto: string;
}

export interface Roteiro {
  id: string;
  destino: string;
  dias: number;
  tribo: Tribo;
  curadoria: boolean;
  resumoDias: DiaResumo[];
  /** Data ISO (AAAA-MM-DD). */
  atualizadoEm: string;
  /** Conteúdo de exemplo do protótipo: exibe o selo "Exemplo". */
  exemplo: boolean;
}

export interface Comentario {
  id: string;
  roteiroId: string;
  tipo: TipoComentario;
  texto: string;
  /** Só no relato. Formato AAAA-MM. */
  quandoFoi: string | null;
  autorNome: string;
  /** Id do comentário pai, ou null se for de primeiro nível. */
  respostaA: string | null;
  /** Data e hora ISO. */
  criadoEm: string;
  exemplo: boolean;
}

export interface NovoComentario {
  roteiroId: string;
  tipo: TipoComentario;
  texto: string;
  quandoFoi: string | null;
  autorNome: string;
  respostaA: string | null;
}

export type TipoNotificacao = 'resposta' | 'relato-ajudou' | 'nova-pergunta';

export interface Notificacao {
  id: string;
  tipo: TipoNotificacao;
  texto: string;
  roteiroId: string;
  criadoEm: string;
  exemplo: boolean;
}
