import { useState } from 'react'
import { Alert, Button, Stack, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const camposIniciales = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
}

const campos = [
  { name: 'nombre', label: 'Nombre y apellido', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'asunto', label: 'Asunto', type: 'text' },
]

function FormularioContacto() {
  const [datos, setDatos] = useState(camposIniciales)
  const [estado, setEstado] = useState('idle')

  const actualizarCampo = (evento) => {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  const enviar = async (evento) => {
    evento.preventDefault()
    setEstado('enviando')
    try {
      const respuesta = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contacto', 'bot-field': '', ...datos }).toString(),
      })
      if (!respuesta.ok) {
        throw new Error('Error en el envío')
      }
      setDatos(camposIniciales)
      setEstado('exito')
    } catch {
      setEstado('error')
    }
  }

  return (
    <>
      <form name="contacto" data-netlify="true" netlify-honeypot="bot-field" onSubmit={enviar} noValidate>
        <input type="hidden" name="form-name" value="contacto" />

        <Stack spacing={2}>
          {campos.map((campo) => (
            <TextField
              key={campo.name}
              label={campo.label}
              name={campo.name}
              type={campo.type}
              value={datos[campo.name]}
              onChange={actualizarCampo}
              required
              fullWidth
            />
          ))}

          <TextField
            label="Mensaje"
            name="mensaje"
            value={datos.mensaje}
            onChange={actualizarCampo}
            required
            multiline
            minRows={4}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            disabled={estado === 'enviando'}
            sx={{ alignSelf: 'flex-start' }}
          >
            {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </Stack>
      </form>

      {estado === 'exito' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          ¡Gracias por tu mensaje! Lo recibimos correctamente y te responderemos a la brevedad.
        </Alert>
      )}
      {estado === 'error' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Hubo un problema al enviar tu mensaje. Probá nuevamente en unos instantes.
        </Alert>
      )}
    </>
  )
}

export default FormularioContacto