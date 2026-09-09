import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {
  CheckCircle,
  Download,
  ExpandMore,
  LocationOn,
  OpenInNew,
  Schedule,
  Search,
  SupportAgent,
} from '@mui/icons-material'
import tramites from '../data/tramites.json'
import { estiloPorId, porDefecto } from '../data/accesos'
import IconoSquircle from '../components/IconoSquircle'

const categorias = ['Todos', ...new Set(tramites.map((tramite) => tramite.categoria))]

function TramiteAccordion({ tramite, expandido = false, onToggle }) {
  const estilo = estiloPorId(tramite.id) ?? porDefecto
  const Icono = estilo.icono

  return (
    <Accordion
      variant="outlined"
      id={`tramite-${tramite.id}`}
      expanded={expandido}
      onChange={onToggle}
      sx={{ borderRadius: 2, scrollMarginTop: 12 }}
    >
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 1, minWidth: 0 }}>
          <IconoSquircle
            color={estilo.color}
            colorOscuro={estilo.colorOscuro}
            size={48}
            sx={{ borderRadius: 2.5 }}
          >
            <Icono sx={{ fontSize: 24 }} />
          </IconoSquircle>
          <Box sx={{ minWidth: 0 }}>
            <Chip label={tramite.categoria} size="small" variant="outlined" sx={{ mb: 0.5 }} />
            <Typography variant="h6" component="h3">
              {tramite.titulo}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {tramite.descripcion}
        </Typography>

        {tramite.tipo === 'link' ? (
          <Button
            component="a"
            href={tramite.urlExterna}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            endIcon={<OpenInNew />}
            size="large"
          >
            Tramitar online
          </Button>
        ) : (
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Requisitos
              </Typography>
              <List dense>
                {tramite.requisitos.map((requisito) => (
                  <ListItem key={requisito} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={requisito} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ display: 'grid', alignContent: 'start', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Atención presencial
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" fontSize="small" />
                <Typography variant="body2">{tramite.dondeSeHace}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Schedule color="primary" fontSize="small" />
                <Typography variant="body2">{tramite.horario}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SupportAgent color="primary" fontSize="small" />
                <Typography variant="body2">{tramite.contacto}</Typography>
              </Box>

              {tramite.descargables?.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Documentación
                  </Typography>
                  {tramite.descargables.map((archivo) => (
                    <Link
                      key={archivo.nombre}
                      href={archivo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Download fontSize="small" />
                      {archivo.nombre}
                    </Link>
                  ))}
                </Box>
              )}

              {tramite.enlaces?.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Mapas y Catastro
                  </Typography>
                  {tramite.enlaces.map((enlace) => (
                    <Link
                      key={enlace.nombre}
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <OpenInNew fontSize="small" />
                      {enlace.nombre}
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

function Tramites() {
  const { id } = useParams()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [expandidos, setExpandidos] = useState(() => (id ? new Set([id]) : new Set()))

  useEffect(() => {
    if (id) {
      const elemento = document.getElementById(`tramite-${id}`)
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [id])

  const toggleExpandido = (tramiteId) => {
    setExpandidos((prev) => {
      const next = new Set(prev)
      if (next.has(tramiteId)) next.delete(tramiteId)
      else next.add(tramiteId)
      return next
    })
  }

  const tramitesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    return tramites.filter((tramite) => {
      const coincideCategoria = categoria === 'Todos' || tramite.categoria === categoria
      const coincideBusqueda =
        !termino ||
        tramite.titulo.toLowerCase().includes(termino) ||
        tramite.descripcion.toLowerCase().includes(termino)
      return coincideCategoria && coincideBusqueda
    })
  }, [busqueda, categoria])

  return (
    <>
      <Box sx={{ backgroundColor: '#eef9fa', py: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            Trámites
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 0 }}>
            Consultá los servicios digitales disponibles o seguí las guías paso a paso para
            realizar tus trámites municipales.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TextField
        fullWidth
        placeholder="Buscá por nombre del trámite..."
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />

      <Tabs
        value={categoria}
        onChange={(_, nuevoValor) => setCategoria(nuevoValor)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Categorías de trámites"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {categorias.map((categoriaItem) => (
          <Tab key={categoriaItem} label={categoriaItem} value={categoriaItem} />
        ))}
      </Tabs>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {tramitesFiltrados.map((tramite) => (
          <TramiteAccordion
            key={tramite.id}
            tramite={tramite}
            expandido={expandidos.has(tramite.id)}
            onToggle={() => toggleExpandido(tramite.id)}
          />
        ))}
      </Box>

      {tramitesFiltrados.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
          No se encontraron trámites para tu búsqueda.
        </Typography>
      )}
      </Container>
    </>
  )
}

export default Tramites