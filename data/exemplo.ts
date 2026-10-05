import type { Comentario, Imagem, Notificacao, Roteiro } from '@/lib/tipos';

// Conteúdo de exemplo do protótipo. Nomes de autores são fictícios e genéricos.
// Tudo aqui exibe o selo "Exemplo" na interface.

// Imagens fictícias, geradas por IA.
export const imagemBoasVindas: Imagem = {
  src: '/imagens/boas-vindas.jpg',
  alt: 'Estrada reta entre campos verdes em direção ao horizonte',
};

export const roteirosExemplo: Roteiro[] = [
  {
    id: 'serra-do-rio-do-rastro',
    destino: 'Serra do Rio do Rastro (SC)',
    dias: 3,
    tribo: 'Moto',
    curadoria: true,
    atualizadoEm: '2026-09-12',
    imagem: { src: '/imagens/moto.jpg', alt: 'Estrada de serra com curvas em zigue-zague entre encostas verdes' },
    exemplo: true,
    resumoDias: [
      {
        dia: 1,
        titulo: 'Chegada em Lauro Müller',
        texto: 'Rodagem tranquila até a base da serra. Noite em pousada perto da subida.',
      },
      {
        dia: 2,
        titulo: 'Subida da serra e mirante',
        texto: 'Subida cedo, com pouco movimento. Parada longa no mirante lá em cima.',
      },
      {
        dia: 3,
        titulo: 'Urubici e volta',
        texto: 'Café em Urubici e retorno pelo planalto, sem pressa nas curvas.',
      },
    ],
  },
  {
    id: 'aparecida',
    destino: 'Aparecida (SP)',
    dias: 2,
    tribo: 'Religioso',
    curadoria: true,
    atualizadoEm: '2026-08-28',
    imagem: { src: '/imagens/religioso.jpg', alt: 'Basílica de tijolos com torre do relógio e uma grande praça à frente' },
    exemplo: true,
    resumoDias: [
      {
        dia: 1,
        titulo: 'Basílica e passarela',
        texto: 'Missa no Santuário Nacional e caminhada pela passarela da fé.',
      },
      {
        dia: 2,
        titulo: 'Morro do Cruzeiro e Porto Itaguaçu',
        texto: 'Subida ao Morro do Cruzeiro pela manhã e visita ao porto à tarde.',
      },
    ],
  },
  {
    id: 'estrada-real-ouro-preto-tiradentes',
    destino: 'Estrada Real: Ouro Preto a Tiradentes (MG)',
    dias: 3,
    tribo: 'Fusca',
    curadoria: true,
    atualizadoEm: '2026-09-30',
    imagem: {
      src: '/imagens/fusca.jpg',
      alt: 'Fusca azul numa estrada de terra, com uma cidade pequena entre morros ao fundo',
    },
    exemplo: true,
    resumoDias: [
      {
        dia: 1,
        titulo: 'Ouro Preto',
        texto: 'Ladeiras de pedra pedem calma e primeira marcha. Centro histórico a pé.',
      },
      {
        dia: 2,
        titulo: 'Rumo a São João del-Rei',
        texto: 'Trecho com paradas em cidades pequenas e muitas fotos na estrada.',
      },
      {
        dia: 3,
        titulo: 'Tiradentes',
        texto: 'Chegada no fim da manhã e tarde livre para andar pelas ruas antigas.',
      },
    ],
  },
];

export const comentariosExemplo: Comentario[] = [
  // Serra do Rio do Rastro
  {
    id: 'c-serra-pergunta',
    roteiroId: 'serra-do-rio-do-rastro',
    tipo: 'pergunta',
    texto: 'A serra fecha com neblina em setembro? Queria saber se vale subir no fim da tarde.',
    quandoFoi: null,
    autorNome: 'Viajante Ana',
    respostaA: null,
    criadoEm: '2026-09-28T14:10:00.000Z',
    exemplo: true,
  },
  {
    id: 'c-serra-dica',
    roteiroId: 'serra-do-rio-do-rastro',
    tipo: 'dica',
    texto: 'Abasteça em Lauro Müller. Na subida não tem posto e o frio lá em cima pega desprevenido.',
    quandoFoi: null,
    autorNome: 'Viajante Rui',
    respostaA: null,
    criadoEm: '2026-09-20T09:00:00.000Z',
    exemplo: true,
  },
  {
    id: 'c-serra-relato',
    roteiroId: 'serra-do-rio-do-rastro',
    tipo: 'relato',
    texto: 'Subimos às 7h e a estrada estava vazia. Paramos no mirante e ficamos quase uma hora só olhando.',
    quandoFoi: '2026-07',
    autorNome: 'Viajante Lia',
    respostaA: null,
    criadoEm: '2026-08-02T18:30:00.000Z',
    exemplo: true,
  },
  // Aparecida
  {
    id: 'c-aparecida-pergunta',
    roteiroId: 'aparecida',
    tipo: 'pergunta',
    texto: 'Dá para estacionar perto da Basílica num domingo ou é melhor deixar o carro mais longe?',
    quandoFoi: null,
    autorNome: 'Viajante Caio',
    respostaA: null,
    criadoEm: '2026-09-25T11:45:00.000Z',
    exemplo: true,
  },
  {
    id: 'c-aparecida-dica',
    roteiroId: 'aparecida',
    tipo: 'dica',
    texto: 'Leve água e um casaco leve. A subida do Morro do Cruzeiro é curta, mas o sol castiga.',
    quandoFoi: null,
    autorNome: 'Viajante Bia',
    respostaA: null,
    criadoEm: '2026-09-10T08:20:00.000Z',
    exemplo: true,
  },
  {
    id: 'c-aparecida-relato',
    roteiroId: 'aparecida',
    tipo: 'relato',
    texto: 'Fomos com a família toda numa sexta. Muito mais calmo que no fim de semana, deu para ver tudo sem fila.',
    quandoFoi: '2026-05',
    autorNome: 'Viajante Téo',
    respostaA: null,
    criadoEm: '2026-06-01T16:00:00.000Z',
    exemplo: true,
  },
  // Estrada Real
  {
    id: 'c-estrada-pergunta',
    roteiroId: 'estrada-real-ouro-preto-tiradentes',
    tipo: 'pergunta',
    texto: 'Fusca 1300 aguenta bem as ladeiras de Ouro Preto ou é melhor deixar na pousada?',
    quandoFoi: null,
    autorNome: 'Viajante Duda',
    respostaA: null,
    criadoEm: '2026-10-01T10:05:00.000Z',
    exemplo: true,
  },
  {
    id: 'c-estrada-dica',
    roteiroId: 'estrada-real-ouro-preto-tiradentes',
    tipo: 'dica',
    texto: 'Revise freio e embreagem antes de sair. Em Tiradentes, estacione na entrada da cidade e siga a pé.',
    quandoFoi: null,
    autorNome: 'Viajante Nina',
    respostaA: null,
    criadoEm: '2026-09-18T13:40:00.000Z',
    exemplo: true,
  },
  {
    id: 'c-estrada-relato',
    roteiroId: 'estrada-real-ouro-preto-tiradentes',
    tipo: 'relato',
    texto: 'Fizemos em dois fuscas. Um ferveu na serra antes de São João, paramos meia hora e seguimos rindo.',
    quandoFoi: '2026-04',
    autorNome: 'Viajante Léo',
    respostaA: null,
    criadoEm: '2026-04-22T19:15:00.000Z',
    exemplo: true,
  },
];

export const notificacoesExemplo: Notificacao[] = [
  {
    id: 'n-resposta',
    tipo: 'resposta',
    texto: 'Viajante Rui respondeu sua pergunta',
    roteiroId: 'serra-do-rio-do-rastro',
    criadoEm: '2026-10-04T15:20:00.000Z',
    exemplo: true,
  },
  {
    id: 'n-relato-ajudou',
    tipo: 'relato-ajudou',
    texto: 'Seu relato ajudou viajantes',
    roteiroId: 'estrada-real-ouro-preto-tiradentes',
    criadoEm: '2026-10-03T09:00:00.000Z',
    exemplo: true,
  },
  {
    id: 'n-nova-pergunta',
    tipo: 'nova-pergunta',
    texto: 'Nova pergunta sobre um destino onde você esteve',
    roteiroId: 'aparecida',
    criadoEm: '2026-10-02T18:45:00.000Z',
    exemplo: true,
  },
];

/** Contador do sino: fixo e simulado neste protótipo. */
export const NOTIFICACOES_NAO_LIDAS = 3;
