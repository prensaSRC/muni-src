import { createTheme } from '@mui/material/styles'

const MUNI = {
  turquesa: '#00adb7',
  turquesaDark: '#008a92',
  turquesaLight: '#b3eef0',
  turquesaOscura: '#006a73',
  naranja: '#ff7300',
  naranjaLight: '#ff9b00',
  verde: '#7cc100',
  verdeLight: '#b4d006',
  texto: '#505762',
  textoClaro: '#4a4a6a',
  fondo: '#f8f9fa',
  borde: '#e9ecef',
  whatsapp: '#25d366',
}

export const colores = MUNI

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: MUNI.turquesa,
      dark: MUNI.turquesaDark,
      light: MUNI.turquesaLight,
      contrastText: '#ffffff',
    },
    secondary: {
      main: MUNI.naranja,
      light: MUNI.naranjaLight,
      contrastText: '#ffffff',
    },
    success: {
      main: MUNI.verde,
      light: MUNI.verdeLight,
    },
    text: {
      primary: MUNI.texto,
      secondary: MUNI.textoClaro,
    },
    background: {
      default: MUNI.fondo,
      paper: '#ffffff',
    },
    divider: MUNI.borde,
  },
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
})

export default theme
