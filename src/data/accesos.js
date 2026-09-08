import {
  Construction,
  DirectionsCar,
  EventAvailable,
  Payments,
  ReportProblem,
  Storefront,
} from '@mui/icons-material'

export const accesos = [
  { id: 'pagos-tasas', icono: Payments, color: '#7cc100', colorOscuro: '#5b9100' },
  { id: 'turnero-cididi', icono: EventAvailable, color: '#00adb7', colorOscuro: '#008a92' },
  { id: 'licencia-conducir', icono: DirectionsCar, color: '#ff7300', colorOscuro: '#d95f00' },
  { id: 'reclamos', icono: ReportProblem, color: '#e05e4f', colorOscuro: '#b84538' },
  { id: 'habilitacion-comercial', icono: Storefront, color: '#f2a900', colorOscuro: '#c98b00' },
  { id: 'obras-privadas', icono: Construction, color: '#3aabb5', colorOscuro: '#0e98ae' },
]

export const estiloPorId = (id) => accesos.find((acceso) => acceso.id === id)

export const porDefecto = {
  icono: EventAvailable,
  color: '#00adb7',
  colorOscuro: '#008a92',
}