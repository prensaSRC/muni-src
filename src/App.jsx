import { lazy, Suspense } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import theme from './theme/theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

const Tramites = lazy(() => import('./pages/Tramites'))
const ContactoDependencias = lazy(() => import('./pages/ContactoDependencias'))
const DependenciaDetalle = lazy(() => import('./pages/DependenciaDetalle'))
const Contacto = lazy(() => import('./pages/Contacto'))

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tramites" element={<Tramites />} />
            <Route path="/tramites/:id" element={<Tramites />} />
            <Route path="/dependencias" element={<ContactoDependencias />} />
            <Route path="/dependencias/:id" element={<DependenciaDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App