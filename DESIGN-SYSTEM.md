# Mini design system — Comunidade Trib (protótipo)

Derivado do Brandbook Trib. Os tokens ficam em [`tailwind.config.ts`](tailwind.config.ts). A paleta padrão do Tailwind foi **substituída** (não estendida), então só as cores abaixo existem no código.

## Cores

Contraste medido com a fórmula da WCAG 2.1. O mínimo é AA, 4,5:1, para texto comum.

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `rosa` | `#FF496A` | Cor de marca, só em elementos sem texto: ícone ativo, barra de destaque (dias do roteiro), borda do comentário recém-publicado, marcador de lista. Nunca com texto branco em cima. | — (branco em cima: 3,27:1, reprova) |
| `rosa-acao` | `#D11F47` | Fundo do botão principal e do contador do sino, com texto branco | 5,25:1 ✓ |
| `rosa-acao-press` | `#AA0948` | Botão principal pressionado ou com hover; borda de campo com erro | 7,39:1 ✓ |
| `rosa-claro` | `#FFBFCA` | Fundo de chip/aba selecionada, selo "Relato" e círculo do ícone nas notificações, com texto `tinta` | 10,66:1 ✓ |
| `bordo` | `#AA0948` | Links, botão secundário (texto e borda), mensagens de erro, anel de foco | 7,39:1 sobre branco ✓ · 5,94:1 sobre areia ✓ · 6,69:1 sobre dica-fundo ✓ |
| `areia` | `#EDE5DF` | Fundo das telas e da área fora da coluna | — |
| `branco` | `#FFFFFF` | Cartões, campos, toasts | — |
| `tinta` | `#2B1A20` | Texto principal | 16,52:1 sobre branco ✓ · 13,27:1 sobre areia ✓ |
| `tinta-2` | `#5E4E54` | Texto secundário, datas, autores, placeholder dos campos, rodapé | 7,80:1 sobre branco ✓ · 6,26:1 sobre areia ✓ |
| `borda` | `#DCD2CB` | Bordas de cartão e divisores | — |
| `verde` | `#008C80` | Cor de marca, só decorativa: ícone grande do placeholder, ícone do estado vazio, do toast e das regras | — (branco em cima: 4,15:1, reprova) |
| `curadoria-fundo` / `curadoria-texto` | `#E6F7F3` / `#00756B` | Selo "Curadoria Trib" | 5,05:1 ✓ |
| `pergunta-fundo` / `pergunta-texto` | `#FFF1DE` / `#8A4B00` | Selo "Pergunta" e aviso "Sem resposta ainda · você já foi?" | 6,12:1 ✓ |
| `dica-fundo` / `dica-texto` | `#FFF0F3` / `#AA0948` | Selos "Dica" e "Resposta"; fundo pressionado do botão secundário e dos cartões clicáveis | 6,69:1 ✓ |
| `exemplo-fundo` / `exemplo-texto` | `#EDE5DF` / `#5E4E54` | Selo "Exemplo" | 6,26:1 ✓ |

### Pares de texto e fundo usados

Todos estão na tabela acima. Nenhum par novo foi criado.

- Texto branco: só sobre `rosa-acao` ou `rosa-acao-press`.
- Texto `tinta`: sobre `branco`, `areia` ou `rosa-claro`. Inclui o texto "imagem ilustrativa" do placeholder, cujo gradiente vai de `rosa-claro` a `areia`.
- Texto `tinta-2`: sobre `branco` ou `areia`.
- Texto `bordo`: sobre `branco`, `areia` ou `dica-fundo`.
- Selos: cada par fundo/texto da tabela; o selo de tribo usa `tinta` sobre `branco`.
- Selos sobre ilustração: fundo `branco` a 92% de opacidade, com o mesmo texto de antes: `curadoria-texto` sobre branco (5,59:1 ✓) e `tinta` sobre branco (16,52:1 ✓).

### Regra de peso da marca

Rosa e areia/branco dominam a composição. Verde e bordô aparecem em detalhes.

## Cores de ilustração (não usar em texto)

Usadas só dentro das cenas de `components/ilustracoes/` (definidas em `components/ilustracoes/cores.ts`). Nunca em texto, fundo de componente ou borda. Além delas, as cenas usam `rosa` (sol), `areia`, `branco` e `tinta` (silhueta do Fusca).

| Nome | Hex | Uso |
|---|---|---|
| `ceuDia` | `#CFE8F3` | Céu de dia (topo do gradiente) |
| `ceuClaro` | `#F6F1EA` | Céu perto do horizonte, de manhã |
| `ceuTarde` | `#F9CDBB` | Céu de fim de tarde (topo) |
| `ceuTardeClaro` | `#FDEBDD` | Céu de fim de tarde perto do horizonte |
| `bruma` | `#C9BCC6` | Serra distante em bruma |
| `morroLonge` | `#A9CDB4` | Morros ao fundo |
| `morro` | `#84B793` | Morros no plano médio |
| `mato` | `#6FA382` | Mato e encostas |
| `matoFrente` | `#5A9470` | Primeiro plano |
| `terra` | `#C9A27E` | Estrada de terra |
| `terraEscura` | `#A9825F` | Marcas na estrada |
| `telhado` | `#C9785B` | Telhados coloniais |
| `madeira` | `#8C6A55` | Portas e janelas |

O verde aparece em tons médios de mato, nunca como verde-escuro dominante. A paleta Trib entra nos detalhes: sol `rosa` e estradas/casas em `areia`.

## Sombra

`shadow-leve`: `0 2px 8px` em `tinta` a 18%. Usada só no botão voltar sobre a ilustração da T3. Cartões continuam sem sombra.

## Tipografia

Poppins, carregada via `next/font/google` (pesos 400, 500, 600 e 700).

| Classe | Tamanho / altura de linha | Uso |
|---|---|---|
| `text-tela` | 24 / 32 px, 600 | Título de tela |
| `text-secao` | 18 / 26 px, 600 | Título de seção |
| `text-cartao` | 16 / 24 px, 600 | Título de cartão |
| `text-corpo` | 16 / 24 px (1,5) | Corpo |
| `text-aux` | 14 / 20 px | Texto auxiliar |
| `text-selo` | 12 / 16 px, 600 | **Só** selos e o contador do sino |

## Espaçamento

- Escala de 4 px: 4, 8, 12, 16, 24 e 32 (`1`, `2`, `3`, `4`, `6` e `8` no Tailwind).
- Margem lateral da tela: 16 px.
- Espaço entre cartões: 12 px.
- Espaço entre seções: 24 px.
- Coluna única de 390 px (`max-w-coluna`), também no computador.

## Componentes

| Componente | Arquivo | Regras |
|---|---|---|
| Botão principal | `components/ui/Botao.tsx` (`variante="principal"`) | Fundo `rosa-acao`, texto branco 16/600, altura 48 px, cantos 12 px, largura total. Fica fixo na base da tela (`BarraAcao`). Um por tela. |
| Botão secundário | idem (`variante="secundario"`) | Fundo branco, borda 1,5 px `bordo`, texto `bordo`. `tamanho="compacto"` usa texto de 14 px. |
| Botão de texto/link | idem (`variante="texto"`) | `bordo`, sublinhado no hover e no foco. |
| Campo | `components/ui/Campo.tsx` | Fundo branco, borda `borda`, mínimo de 48 px, cantos 12 px, rótulo visível acima. Foco: borda de 2 px `bordo`. Erro: borda `rosa-acao-press` + mensagem em texto abaixo, com ícone. |
| Cartão | `components/ui/Cartao.tsx` | Fundo branco, borda de 1 px `borda`, cantos 16 px, sem sombra. |
| Chips e abas | `components/ui/Chips.tsx`, `components/ui/Abas.tsx` | Visual de 40 px, totalmente arredondados, dentro de um alvo de toque de 44 px. Selecionado: fundo `rosa-claro`, texto `tinta` 600. As abas aceitam as setas do teclado. |
| Selos | `components/ui/Selo.tsx` | 12 px/600, padding de 4×8 px, cantos de 999 px, sempre ícone + texto. |
| Toast | `components/ui/Toast.tsx` | Fundo branco, texto `tinta`, região `aria-live="polite"`. |
| Estado vazio | `components/ui/EstadoVazio.tsx` | "Ainda não tem nada por aqui. Que tal começar a conversa?" |
| Ilustração | `components/ilustracoes/` | Cenas de paisagem em SVG, uma por roteiro (Moto: serra com estrada sinuosa; Religioso: cidade com igreja de duas torres; Fusca: estrada de terra com Fusca e casario) e uma de boas-vindas. Plana, 4 a 6 camadas, céu em gradiente, luz de dia. Cada uma tem `role="img"` e `aria-label` descritivo. Sem pessoas, logos ou textos. O rodapé avisa "Imagens ilustrativas". |
| Logo | `components/LogoSlot.tsx` | Vazio de propósito. O logo oficial entra aqui; nunca redesenhe o logo. |

## Ícones

`lucide-react`, traço 1,75, 20 a 24 px. Os ícones dentro de selos usam 16 px, para caber na altura do selo. Ícones grandes de placeholder usam 40 px. Sem emoji na interface.

## Estados

- **Padrão**
- **Pressionado:** botão principal em `rosa-acao-press`; botão secundário e cartões clicáveis em `dica-fundo`.
- **Foco visível:** anel de 2 px `bordo` com 2 px de afastamento. Nos campos, a borda passa a 2 px `bordo`.
- **Desabilitado:** opacidade de 40% + `aria-disabled`. Usado enquanto uma publicação está sendo enviada.
- **Vazio:** componente `EstadoVazio`.
- **Sucesso ao publicar:** toast "Publicado. Valeu por compartilhar."

## Acessibilidade

- Alvos de toque de 44×44 px ou mais.
- Tudo navegável por teclado.
- HTML semântico: `main`, `header`, `footer`, `section`, `article`, `button`, `a`, `label` e `fieldset`.
- `aria-live` nos toasts.
- `prefers-reduced-motion` respeitado em `app/globals.css`.
