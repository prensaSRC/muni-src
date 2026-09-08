import { Box, Button, Card, Chip, Container, Typography } from '@mui/material'
import { ArrowForward, Mail, OpenInNew } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import tramites from '../data/tramites.json'
import noticias from '../data/noticias.json'
import { accesos } from '../data/accesos'
import IconoSquircle from '../components/IconoSquircle'
import logoBlanco from '../assets/logos/logo-blanco.svg'
import hero480 from '../assets/hero/hero-480.webp'
import hero768 from '../assets/hero/hero-768.webp'
import hero1200 from '../assets/hero/hero-1200.webp'
import hero1920 from '../assets/hero/hero-1920.webp'

const accesosRapidos = accesos
  .map((acceso) => ({
    ...acceso,
    tramite: tramites.find((item) => item.id === acceso.id),
  }))
  .filter((acceso) => acceso.tramite)

const formatearFecha = (fecha) =>
  new Date(fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })

function Home() {
  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'relative',
          minHeight: { xs: '72vh', md: '88vh' },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          color: 'common.white',
        }}
      >
        <picture>
          <source
            type="image/webp"
            srcSet={`${hero480} 480w, ${hero768} 768w, ${hero1200} 1200w, ${hero1920} 1920w`}
            sizes="100vw"
          />
          <Box
            component="img"
            src={hero1920}
            alt=""
            loading="eager"
            fetchPriority="high"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </picture>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 58, 62, 0.66) 0%, rgba(0, 58, 62, 0.3) 45%, rgba(0, 42, 45, 0.9) 100%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 6, md: 9 } }}>
          <Box sx={{ maxWidth: 760 }}>
            <Typography
              component="h1"
              sx={{
                position: 'absolute',
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
            <Box
              component="img"
              src={logoBlanco}
              alt=""
              sx={{
                display: 'block',
                height: { xs: 52, sm: 70, md: 90 },
                width: 'auto',
                mb: 3,
              }}
            />
            <Typography variant="h5" component="p" sx={{ color: 'rgba(255, 255, 255, 0.95)', mt: 1 }}>
              Todo lo que necesitás de tu municipio: trámites, servicios e información, cerca de vos.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
              <Button
                component={RouterLink}
                to="/tramites"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForward />}
              >
                Ver trámites
              </Button>
              <Button
                component={RouterLink}
                to="/contacto"
                variant="outlined"
                size="large"
                sx={{ color: 'common.white', borderColor: 'rgba(255, 255, 255, 0.6)' }}
              >
                Contactanos
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: '#eef9fa', py: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            Accesos rápidos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Los trámites más buscados, a un clic.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            }}
          >
            {accesosRapidos.map(({ tramite, icono: Icono, color, colorOscuro }) => (
              <Card
                key={tramite.id}
                component={RouterLink}
                to={`/tramites/${tramite.id}`}
                variant="outlined"
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'transform 160ms ease, box-shadow 160ms ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 12px 26px -14px rgba(0, 106, 115, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ p: 3 }}>
                  <IconoSquircle color={color} colorOscuro={colorOscuro} sx={{ mb: 2 }}>
                    <Icono sx={{ fontSize: { xs: 30, md: 34 } }} />
                  </IconoSquircle>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {tramite.titulo}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {tramite.descripcion}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: '#f4f9ea', py: 5 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              flexDirection: { xs: 'column', md: 'row' },
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 0 }}>
                Noticias y avisos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avisos provisorios — las oficiales, en el portal externo.
              </Typography>
            </Box>
            <Button
              component="a"
              href="https://santarosainforma.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              color="primary"
              endIcon={<OpenInNew />}
            >
              Ver noticias actualizadas
            </Button>
          </Box>

          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            {noticias.map((noticia) => (
              <Card
                key={noticia.id}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderLeft: '4px solid',
                  borderLeftColor: 'primary.main',
                }}
              >
                <Box sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Chip label={noticia.categoria} size="small" color="primary" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">
                      {formatearFecha(noticia.fecha)}
                    </Typography>
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {noticia.titulo}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {noticia.resumen}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            color: 'common.white',
            borderRadius: 2,
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'common.white' }}>
              ¿Tenés una consulta o sugerencia?
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.95)', mt: 1 }}>
              Nuestro equipo de atención al vecino te responde de lunes a viernes.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/contacto"
            variant="contained"
            size="large"
            startIcon={<Mail />}
            sx={{ backgroundColor: 'common.white', color: 'secondary.main', ':hover': { backgroundColor: 'grey.100' } }}
          >
            Contactanos
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Home