import { Box, Container, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PhoneIcon from '@mui/icons-material/Phone'
import XIcon from '@mui/icons-material/X'
import logoBlanco from '../assets/logos/logo-blanco.svg'
import { colores } from '../theme/theme'

const enlacesRapidos = [
  { label: 'Inicio', to: '/' },
  { label: 'Trámites', to: '/tramites' },
  { label: 'Dependencias', to: '/dependencias' },
  { label: 'Contacto', to: '/contacto' },
]

const redes = [
  { icono: FacebookIcon, label: 'Facebook', url: 'https://www.facebook.com/Municipalidadsantarosa/' },
  { icono: InstagramIcon, label: 'Instagram', url: 'https://www.instagram.com/santarosamuni/' },
  { icono: MusicNoteIcon, label: 'TikTok', url: 'https://www.tiktok.com/' },
  { icono: XIcon, label: 'X (Twitter)', url: 'https://x.com/santarosamuni' },
]

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: colores.turquesaOscura, color: 'common.white', mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ mb: 2 }}>
            <Box
              component="img"
              src={logoBlanco}
              alt=""
              sx={{ height: 40, width: 'auto' }}
            />
            <Typography
              component="span"
              sx={{
                width: 1,
                height: 1,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(50%)',
                whiteSpace: 'nowrap',
              }}
            >
              Municipalidad de Santa Rosa de Calamuchita
            </Typography>
          </Box>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ mt: 0.25 }} />
                <Typography variant="body2">
                  Córdoba 424, Santa Rosa de Calamuchita, Córdoba
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">(03546) 42-9650 / 42-0667</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">intendencia@municipiosantarosa.gob.ar</Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Enlaces rápidos
            </Typography>
            <Stack spacing={1}>
              {enlacesRapidos.map((enlace) => (
                <Link
                  key={enlace.to}
                  component={RouterLink}
                  to={enlace.to}
                  color="inherit"
                  underline="hover"
                  variant="body2"
                >
                  {enlace.label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Atención al vecino
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">Lunes a Viernes de 08:00 a 13:00 hs</Typography>
              <Typography variant="body2">Consultas generales: (03546) 42-9650 / 42-0667</Typography>
              <Typography variant="body2">Emergencias: 103</Typography>
            </Stack>

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
              Redes
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {redes.map(({ icono: Icono, label, url }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{ color: 'common.white' }}
                >
                  <Icono />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Municipalidad de Santa Rosa de Calamuchita. Todos los
          derechos reservados.
        </Typography>
        <Typography
          variant="caption"
          align="center"
          sx={{ display: 'block', mt: 0.5, color: 'rgba(255, 255, 255, 0.75)' }}
        >
          Creado por Área de Prensa y Comunicación de la Municipalidad de Santa Rosa de Calamuchita
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer