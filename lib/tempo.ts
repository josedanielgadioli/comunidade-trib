import { formatarData } from '@/lib/formatar';

/** "agora", "há 5 min", "há 2 h", "ontem", "há 3 dias"; depois de uma semana, a data. */
export function tempoRelativo(iso: string, agora: number = Date.now()): string {
  const minutos = Math.max(0, Math.floor((agora - new Date(iso).getTime()) / 60_000));
  if (minutos < 1) return 'agora';
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas} h`;
  const dias = Math.floor(horas / 24);
  if (dias === 1) return 'ontem';
  if (dias < 7) return `há ${dias} dias`;
  return formatarData(iso);
}
