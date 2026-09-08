import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { NavLink, useLocation } from 'react-router-dom'
import logoTurquesa1Tinta from '../assets/logos/logo-gris.svg'
import { colores } from '../theme/theme'
import contactos from '../data/contactos.json'
import { estiloArea } from '../data/areas'
import IconoSquircle from './IconoSquircle'

const urlConcejo = 'https://hcd-src.com/'

const etiquetasCortas = {
  intendencia: 'Intendencia',
  'centro-de-salud': 'Secretaría de Salud',
  'obras-publicas': 'Obras Privadas',
  'juzgado-de-faltas': 'Juzgado de Faltas',
  turismo: 'Turismo, Cultura y Deportes',
  dispo: 'DISPO',
}

const dependenciasMenu = contactos.map((contacto) => ({
  id: contacto.id,
  area: contacto.area,
  label: etiquetasCortas[contacto.id] ?? contacto.area,
}))

const estiloPill = ({ isActive }) => ({
  backgroundColor: isActive ? colores.turquesaOscura : 'transparent',
  color: isActive ? '#ffffff' : undefined,
  fontWeight: isActive ? 700 : 500,
})

const estiloLista = ({ isActive }) => ({
  backgroundColor: isActive ? colores.turquesaOscura : 'transparent',
  color: isActive ? '#ffffff' : undefined,
  fontWeight: isActive ? 700 : 400,
})

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [gobiernoAbierto, setGobiernoAbierto] = useState(false)
  const [ancla, setAncla] = useState(null)
  const ubicacion = useLocation()

  const gobiernoActivo = ubicacion.pathname.startsWith('/dependencias')
  const cerrarMenu = () => setMenuAbierto(false)

  const sxPill = {
    borderRadius: '999px',
    px: 2.25,
    color: 'text.primary',
    transition: 'background-color 200ms ease, color 200ms ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 106, 115, 0.08)',
      color: colores.turquesaOscura,
    },
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(10px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.06), 0 6px 24px -14px rgba(0,0,0,0.18)',
      }}
    >
      <Toolbar>
        <Box
          component={NavLink}
          to="/"
          aria-label="Municipalidad de Santa Rosa de Calamuchita - Ir al inicio"
          sx={{
            mr: { xs: 1, md: 3 },
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={logoTurquesa1Tinta}
            alt=""
            sx={{ height: { xs: 28, sm: 38 }, width: 'auto' }}
          />
        </Box>

        <Typography
          noWrap
          component="div"
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
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

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.75 }}>
          <Button component={NavLink} to="/" color="inherit" disableElevation sx={sxPill} style={estiloPill}>
            Inicio
          </Button>

          <Button
            aria-haspopup="menu"
            aria-expanded={ancla !== null}
            aria-controls={ancla ? 'menu-gobierno' : undefined}
            onClick={(evento) => setAncla(evento.currentTarget)}
            color="inherit"
            disableElevation
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 20,
                  transition: 'transform 200ms ease',
                  transform: ancla ? 'rotate(180deg)' : undefined,
                }}
              />
            }
            sx={sxPill}
            style={{
              backgroundColor: gobiernoActivo ? colores.turquesaOscura : 'transparent',
              color: gobiernoActivo ? '#ffffff' : undefined,
              fontWeight: gobiernoActivo ? 700 : 500,
            }}
          >
            Gobierno
          </Button>

          <Button
            component={NavLink}
            to="/tramites"
            color="inherit"
            disableElevation
            sx={sxPill}
            style={estiloPill}
          >
            Trámites
          </Button>

          <Button
            component="a"
            href={urlConcejo}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            disableElevation
            endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            sx={sxPill}
          >
            Concejo Deliberante
          </Button>

          <Button
            component={NavLink}
            to="/contacto"
            color="inherit"
            disableElevation
            sx={sxPill}
            style={estiloPill}
          >
            Contacto
          </Button>
        </Box>

        <IconButton
          edge="end"
          onClick={() => setMenuAbierto(true)}
          sx={{ display: { md: 'none' }, color: colores.turquesaOscura }}
          aria-label="Abrir menú de navegación"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Menu
        id="menu-gobierno"
        anchorEl={ancla}
        open={Boolean(ancla)}
        onClose={() => setAncla(null)}
        MenuListProps={{ dense: true }}
        slotProps={{ paper: { sx: { mt: 1, borderRadius: 2, minWidth: 280 } } }}
      >
        {dependenciasMenu.map((dependencia) => {
          const estilo = estiloArea(dependencia.area)
          const Icono = estilo.icono
          return (
            <MenuItem
              key={dependencia.id}
              component={NavLink}
              to={`/dependencias/${dependencia.id}`}
              onClick={() => setAncla(null)}
              style={({ isActive }) =>
                isActive ? { backgroundColor: 'rgba(0, 106, 115, 0.08)', fontWeight: 700 } : undefined
              }
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <IconoSquircle
                  color={estilo.color}
                  colorOscuro={estilo.colorOscuro}
                  size={32}
                  sx={{ borderRadius: 1.5 }}
                >
                  <Icono sx={{ fontSize: 16 }} />
                </IconoSquircle>
              </ListItemIcon>
              <ListItemText>{dependencia.label}</ListItemText>
            </MenuItem>
          )
        })}
        <Divider sx={{ my: 1 }} />
        <MenuItem
          component={NavLink}
          to="/dependencias"
          onClick={() => setAncla(null)}
          style={({ isActive }) =>
            isActive ? { backgroundColor: 'rgba(0, 106, 115, 0.08)', fontWeight: 700 } : undefined
          }
        >
          <ListItemText
            primary="Todas las dependencias"
            sx={{ pl: 5 }}
            primaryTypographyProps={{ fontWeight: 700 }}
          />
        </MenuItem>
      </Menu>

      <Drawer anchor="right" open={menuAbierto} onClose={() => setMenuAbierto(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={logoTurquesa1Tinta}
              alt="Municipalidad de Santa Rosa de Calamuchita"
              sx={{ height: 32, width: 'auto' }}
            />
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={cerrarMenu} component={NavLink} to="/" sx={{ borderRadius: 2, mx: 1 }} style={estiloLista}>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setGobiernoAbierto((previo) => !previo)}
                aria-expanded={gobiernoAbierto}
                sx={{ borderRadius: 2, mx: 1 }}
                style={gobiernoActivo ? { backgroundColor: colores.turquesaOscura, color: '#ffffff', fontWeight: 700 } : undefined}
              >
                <ListItemText primary="Gobierno" />
                <KeyboardArrowDownIcon
                  sx={{
                    transition: 'transform 200ms ease',
                    transform: gobiernoAbierto ? 'rotate(180deg)' : undefined,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Collapse in={gobiernoAbierto} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dependenciasMenu.map((dependencia) => (
                  <ListItem key={dependencia.id} disablePadding>
                    <ListItemButton
                      onClick={cerrarMenu}
                      component={NavLink}
                      to={`/dependencias/${dependencia.id}`}
                      sx={{ borderRadius: 2, mx: 1, pl: 4 }}
                      style={estiloLista}
                    >
                      <ListItemText primary={dependencia.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={cerrarMenu}
                    component={NavLink}
                    to="/dependencias"
                    sx={{ borderRadius: 2, mx: 1, pl: 4 }}
                    style={estiloLista}
                  >
                    <ListItemText primary="Todas las dependencias" primaryTypographyProps={{ fontWeight: 700 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            <ListItem disablePadding>
              <ListItemButton onClick={cerrarMenu} component={NavLink} to="/tramites" sx={{ borderRadius: 2, mx: 1 }} style={estiloLista}>
                <ListItemText primary="Trámites" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={cerrarMenu}
                component="a"
                href={urlConcejo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 2, mx: 1 }}
              >
                <ListItemText primary="Concejo Deliberante" />
                <OpenInNewIcon sx={{ fontSize: 18 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={cerrarMenu} component={NavLink} to="/contacto" sx={{ borderRadius: 2, mx: 1 }} style={estiloLista}>
                <ListItemText primary="Contacto" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Navbar