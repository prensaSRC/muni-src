import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import FormularioContacto from '../components/FormularioContacto'
import IconoSquircle from '../components/IconoSquircle'

const hoverTarjeta = {
  borderRadius: 2,
  transition: 'transform 160ms ease, box-shadow 160ms ease',
  '&:hover': {
    borderColor: 'primary.main',
    boxShadow: '0 12px 26px -14px rgba(0, 106, 115, 0.4)',
    transform: 'translateY(-2px)',
  },
}

function Contacto() {
  return (
    <Box sx={{ backgroundColor: '#eef9fa', py: { xs: 4, md: 5 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Contacto
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Escribinos tu consulta o sugerencia. Te respondemos a la brevedad.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
            alignItems: 'start',
          }}
        >
          <Paper variant="outlined" sx={{ ...hoverTarjeta, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <IconoSquircle color="#00adb7" colorOscuro="#008a92" size={48} sx={{ borderRadius: 2.5 }}>
                <LocationOnIcon sx={{ fontSize: 24 }} />
              </IconoSquircle>
              <Typography variant="h6">Datos de contacto</Typography>
            </Box>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" sx={{ mt: 0.25 }} />
                <Typography variant="body2">
                  Córdoba 424, Santa Rosa de Calamuchita, Córdoba
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" color="primary" />
                <Typography variant="body2">(03546) 42-9650 / 42-0667</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" color="primary" />
                <Typography variant="body2">intendencia@municipiosantarosa.gob.ar</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ ...hoverTarjeta, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <IconoSquircle color="#7cc100" colorOscuro="#5b9100" size={48} sx={{ borderRadius: 2.5 }}>
                <EmailIcon sx={{ fontSize: 24 }} />
              </IconoSquircle>
              <Typography variant="h6">Formulario</Typography>
            </Box>
            <FormularioContacto />
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default Contacto