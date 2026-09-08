import { useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import ScheduleIcon from '@mui/icons-material/Schedule'
import SearchIcon from '@mui/icons-material/Search'
import { Link as RouterLink } from 'react-router-dom'
import contactos from '../data/contactos.json'
import { estiloArea } from '../data/areas'
import FormularioContacto from '../components/FormularioContacto'
import IconoSquircle from '../components/IconoSquircle'

function ContactoDependencias() {
  const [busqueda, setBusqueda] = useState('')

  const contactosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    if (!termino) return contactos
    return contactos.filter(
      (dependencia) =>
        dependencia.area.toLowerCase().includes(termino) ||
        (dependencia.descripcion ?? '').toLowerCase().includes(termino) ||
        dependencia.telefono.toLowerCase().includes(termino) ||
        dependencia.direccion.toLowerCase().includes(termino)
    )
  }, [busqueda])

  return (
    <>
      <Box sx={{ backgroundColor: '#eef9fa', py: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            Dependencias y contacto
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Buscá el área municipal que necesitás por nombre o teléfono.
          </Typography>

          <TextField
            fullWidth
            placeholder="Buscá por área o teléfono (ej: Turismo, 42-5000)..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mt: 3, mb: 2, backgroundColor: 'background.paper', borderRadius: 2 }}
          />

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            }}
          >
            {contactosFiltrados.map((dependencia) => {
              const estilo = estiloArea(dependencia.area)
              const Icono = estilo.icono
              return (
                <Card
                  key={dependencia.id}
                  component={RouterLink}
                  to={`/dependencias/${dependencia.id}`}
                  variant="outlined"
                  sx={{
                    textDecoration: 'none',
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 12px 26px -14px rgba(0, 106, 115, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent>
                    <IconoSquircle
                      color={estilo.color}
                      colorOscuro={estilo.colorOscuro}
                      sx={{ borderRadius: 2.5, mb: 1.5 }}
                    >
                      <Icono sx={{ fontSize: { xs: 30, md: 34 } }} />
                    </IconoSquircle>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {dependencia.area}
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <LocationOnIcon fontSize="small" color="primary" sx={{ mt: 0.25 }} />
                        <Typography variant="body2">{dependencia.direccion}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{dependencia.telefono}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{dependencia.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ScheduleIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{dependencia.horario}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              )
            })}
          </Box>

          {contactosFiltrados.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              No se encontraron dependencias para tu búsqueda.
            </Typography>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Escribinos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Completá el formulario y te responderemos a la brevedad.
        </Typography>
        <FormularioContacto />
      </Container>
    </>
  )
}

export default ContactoDependencias