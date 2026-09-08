import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import logoTurquesa1Tinta from '../assets/logos/logo-gris.svg'
import { colores } from '../theme/theme'

const enlaces = [
  { label: 'Inicio', to: '/' },
  { label: 'Trámites', to: '/tramites' },
  { label: 'Dependencias', to: '/dependencias' },
  { label: 'Contacto', to: '/contacto' },
]

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

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
          {enlaces.map((enlace) => (
            <Button
              key={enlace.to}
              component={NavLink}
              to={enlace.to}
              color="inherit"
              disableElevation
              sx={{
                borderRadius: '999px',
                px: 2.25,
                color: 'text.primary',
                transition: 'background-color 200ms ease, color 200ms ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 106, 115, 0.08)',
                  color: colores.turquesaOscura,
                },
              }}
              style={({ isActive }) => ({
                backgroundColor: isActive ? colores.turquesaOscura : 'transparent',
                color: isActive ? '#ffffff' : undefined,
                fontWeight: isActive ? 700 : 500,
              })}
            >
              {enlace.label}
            </Button>
          ))}
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

      <Drawer anchor="right" open={menuAbierto} onClose={() => setMenuAbierto(false)}>
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onClick={() => setMenuAbierto(false)}
          onKeyDown={() => setMenuAbierto(false)}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={logoTurquesa1Tinta}
              alt="Municipalidad de Santa Rosa de Calamuchita"
              sx={{ height: 32, width: 'auto' }}
            />
          </Box>
          <List>
            {enlaces.map((enlace) => (
              <ListItem key={enlace.to} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={enlace.to}
                  sx={{ borderRadius: 2, mx: 1 }}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? colores.turquesaOscura : 'transparent',
                    color: isActive ? '#ffffff' : undefined,
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  <ListItemText primary={enlace.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Navbar