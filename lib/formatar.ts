const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export const NOMES_MESES = MESES;

/** "2026-09-12" ou ISO completo → "12 set. 2026". */
export function formatarData(iso: string): string {
  const data = new Date(iso.length === 10 ? `${iso}T12:00:00.000Z` : iso);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
    .format(data)
    .replace(/ de /g, ' ');
}

/** "2026-07" → "julho de 2026". */
export function formatarMesAno(valor: string): string {
  const [ano, mes] = valor.split('-');
  const nomeMes = MESES[Number(mes) - 1];
  return nomeMes ? `${nomeMes} de ${ano}` : valor;
}

export function plural(n: number, singular: string, pluralTexto: string): string {
  return `${n} ${n === 1 ? singular : pluralTexto}`;
}
