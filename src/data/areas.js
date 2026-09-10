import AccountBalance from '@mui/icons-material/AccountBalance'
import Architecture from '@mui/icons-material/Architecture'
import Balance from '@mui/icons-material/Balance'
import HolidayVillage from '@mui/icons-material/HolidayVillage'
import LocalPolice from '@mui/icons-material/LocalPolice'
import MonitorHeart from '@mui/icons-material/MonitorHeart'
import Payments from '@mui/icons-material/Payments'

const estilosArea = [
  {
    matcher: /intendencia|gobierno/i,
    icono: AccountBalance,
    color: '#00adb7',
    colorOscuro: '#008a92',
  },
  { matcher: /juzgado|faltas/i, icono: Balance, color: '#3aabb5', colorOscuro: '#0e98ae' },
  { matcher: /salud|sanitari/i, icono: MonitorHeart, color: '#e05e4f', colorOscuro: '#b84538' },
  { matcher: /obra/i, icono: Architecture, color: '#f2a900', colorOscuro: '#c98b00' },
  { matcher: /dispo|orden|circulaci/i, icono: LocalPolice, color: '#ff7300', colorOscuro: '#d95f00' },
  { matcher: /finanzas|modernizaci/i, icono: Payments, color: '#8c5ba3', colorOscuro: '#6f4584' },
  { matcher: /.*/, icono: HolidayVillage, color: '#7cc100', colorOscuro: '#5b9100' },
]

export const estiloArea = (area) => estilosArea.find((estilo) => estilo.matcher.test(area))