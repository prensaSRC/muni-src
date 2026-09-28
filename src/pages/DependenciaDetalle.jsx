import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import ScheduleIcon from '@mui/icons-material/Schedule'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Link as RouterLink, useParams } from 'react-router-dom'
import contactos from '../data/contactos.json'
import { estiloArea } from '../data/areas'
import IconoSquircle from '../components/IconoSquircle'

function DependenciaDetalle() {
  const { id } = useParams()
  const dependencia = contactos.find((contacto) => contacto.id === id)

  if (!dependencia) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Dependencia no encontrada
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          El área que buscás no existe o cambió de nombre.
        </Typography>
        <Button component={RouterLink} to="/dependencias" startIcon={<ArrowBack />}>
          Volver a Dependencias
        </Button>
      </Container>
    )
  }

  const estilo = estiloArea(dependencia.area)
  const Icono = estilo.icono

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Button component={RouterLink} to="/dependencias" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Volver a Dependencias
      </Button>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            pb: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
          }}
        >
          <IconoSquircle
            color={estilo.color}
            colorOscuro={estilo.colorOscuro}
            size={{ xs: 64, md: 84 }}
            sx={{ borderRadius: 3 }}
          >
            <Icono sx={{ fontSize: { xs: 34, md: 40 } }} />
          </IconoSquircle>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 0.5 }}>
              {dependencia.area}
            </Typography>
            <Typography color="text.secondary">
              {dependencia.descripcion ?? 'Información de contacto y atención'}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ px: { xs: 3, md: 5 }, pb: { xs: 3, md: 5 } }}>
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <LocationOnIcon fontSize="small" color="primary" sx={{ mt: 0.25 }} />
              <Box>
                <Typography variant="body1">{dependencia.direccion}</Typography>
                {dependencia.provincia && (
                  <Typography variant="caption" color="text.secondary">
                    {dependencia.provincia}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" color="primary" />
              <Typography variant="body1" component="span">
                {dependencia.telefono}
              </Typography>
            </Box>
            {dependencia.whatsapp && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WhatsAppIcon fontSize="small" color="success" />
                <Typography variant="body1" component="span">
                  WhatsApp: {dependencia.whatsapp}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="primary" />
              <Typography variant="body1">{dependencia.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon fontSize="small" color="primary" />
              <Typography variant="body1">{dependencia.horario}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default DependenciaDetalle