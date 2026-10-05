import type { Config } from 'tailwindcss';

// Tokens do mini design system (ver DESIGN-SYSTEM.md).
// As cores substituem a paleta padrão do Tailwind de propósito:
// nenhuma cor fora desta lista pode ser usada.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      rosa: '#FF496A',
      'rosa-acao': '#D11F47',
      'rosa-acao-press': '#AA0948',
      'rosa-claro': '#FFBFCA',
      bordo: '#AA0948',
      areia: '#EDE5DF',
      branco: '#FFFFFF',
      tinta: '#2B1A20',
      'tinta-2': '#5E4E54',
      borda: '#DCD2CB',
      verde: '#008C80',
      'curadoria-fundo': '#E6F7F3',
      'curadoria-texto': '#00756B',
      'pergunta-fundo': '#FFF1DE',
      'pergunta-texto': '#8A4B00',
      'dica-fundo': '#FFF0F3',
      'dica-texto': '#AA0948',
      'exemplo-fundo': '#EDE5DF',
      'exemplo-texto': '#5E4E54',
    },
    fontSize: {
      selo: ['12px', { lineHeight: '16px', fontWeight: '600' }],
      aux: ['14px', { lineHeight: '20px' }],
      corpo: ['16px', { lineHeight: '24px' }],
      cartao: ['16px', { lineHeight: '24px', fontWeight: '600' }],
      secao: ['18px', { lineHeight: '26px', fontWeight: '600' }],
      tela: ['24px', { lineHeight: '32px', fontWeight: '600' }],
    },
    extend: {
      fontFamily: {
        sans: ['var(--fonte-poppins)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        coluna: '390px',
      },
      borderRadius: {
        campo: '12px',
        cartao: '16px',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      backgroundImage: {
        placeholder: 'linear-gradient(135deg, #FFBFCA 0%, #EDE5DF 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
