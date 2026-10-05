import type { Comentario } from '@/lib/tipos';

export const maisNovoPrimeiro = (a: Comentario, b: Comentario) => b.criadoEm.localeCompare(a.criadoEm);
export const maisAntigoPrimeiro = (a: Comentario, b: Comentario) => a.criadoEm.localeCompare(b.criadoEm);

/** Pergunta de primeiro nível que ainda não recebeu nenhuma resposta. */
export function semResposta(c: Comentario, todos: Comentario[]): boolean {
  return c.tipo === 'pergunta' && c.respostaA === null && !todos.some((r) => r.respostaA === c.id);
}

/** Minúsculas e sem acentos, para a busca por destino. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}
