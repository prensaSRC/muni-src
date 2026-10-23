# Plan: Migrar Formulario de Contacto a Hosting IIS (Ferozo)

## Contexto
- Sitio React (Vite) deployado en IIS shared hosting (Ferozo)
- Formulario actual usa Netlify Forms (`data-netlify="true"`) → **no funciona fuera de Netlify**
- Necesitamos endpoint que reciba POST y envíe email

## Decisión tomada: **Rama B — ASP.NET habilitado** ✅
- Test `test.aspx` confirmó: ASP.NET 4.0.30319.42000 disponible
- Usaremos Generic Handler (`.ashx`) + configuración SMTP en `Web.config`

---

## Implementación (Rama B)

### 1. Crear `contacto.ashx` en raíz del sitio (dist/)
```csharp
<%@ WebHandler Language="C#" Class="ContactoHandler" %>
using System;
using System.Web;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;

public class ContactoHandler : IHttpHandler {
  public void ProcessRequest(HttpContext context) {
    context.Response.ContentType = "application/json";
    context.Response.AddHeader("Access-Control-Allow-Origin", "*");
    context.Response.AddHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    context.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type");

    if (context.Request.HttpMethod == "OPTIONS") { context.Response.StatusCode = 200; return; }
    if (context.Request.HttpMethod != "POST") { context.Response.StatusCode = 405; WriteJson(context, false, "Method not allowed"); return; }

    string json;
    using (var reader = new StreamReader(context.Request.InputStream, Encoding.UTF8)) { json = reader.ReadToEnd(); }
    var serializer = new JavaScriptSerializer();
    dynamic data = serializer.DeserializeObject(json);

    string[] required = { "nombre", "email", "asunto", "mensaje" };
    foreach (var f in required) {
      if (data[f] == null || string.IsNullOrWhiteSpace(data[f].ToString())) {
        context.Response.StatusCode = 400; WriteJson(context, false, "Falta campo " + f); return;
      }
    }

    try {
      var mail = new System.Net.Mail.MailMessage();
      mail.From = new System.Net.Mail.MailAddress(data["email"].ToString());
      mail.To.Add("mesaentrada@municipiosantarosa.gob.ar");
      mail.Subject = "Web: " + data["asunto"];
      mail.Body = $"Nombre: {data["nombre"]}\nEmail: {data["email"]}\n\n{data["mensaje"]}";
      mail.IsBodyHtml = false;

      var smtp = new System.Net.Mail.SmtpClient();
      smtp.Send(mail);
      WriteJson(context, true, null);
    } catch (Exception ex) {
      context.Response.StatusCode = 500; WriteJson(context, false, "Error enviando mail: " + ex.Message);
    }
  }

  void WriteJson(HttpContext context, bool ok, string error) {
    var serializer = new JavaScriptSerializer();
    context.Response.Write(serializer.Serialize(new { ok = ok, error = error }));
  }

  public bool IsReusable => false;
}
```

### 2. Agregar configuración SMTP en `Web.config` (raíz del sitio)
```xml
<configuration>
  <system.webServer>
    <staticContent>
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
    </staticContent>
  </system.webServer>
  <system.net>
    <mailSettings>
      <smtp deliveryMethod="Network" from="noreply@municipiosantarosa.gob.ar">
        <network host="smtp.tu-proveedor.com" port="587" userName="tu-usuario" password="tu-password" enableSsl="true" />
      </smtp>
    </mailSettings>
  </system.net>
</configuration>
```
> **Nota:** Los datos SMTP (host, puerto, usuario, password) los debe proveer Ferozo / el cliente. Si ya hay un `Web.config` en el sitio, agregar solo la sección `<system.net>`.

### 3. Modificar `FormularioContacto.jsx`
- Cambiar `fetch('/', ...)` → `fetch('/contacto.ashx', ...)`
- Headers: `'Content-Type': 'application/json'`
- Body: `JSON.stringify(datos)` (sin `form-name`, `bot-field`)
- Quitar atributos Netlify del `<form>`: `data-netlify`, `netlify-honeypot`, `name="contacto"`, input hidden `form-name`

### 4. Build y deploy
```bash
npm run build
```
Subir `dist/` completo (incluye `contacto.ashx` y `Web.config` actualizado) via FileZilla.

---

## Validación
- Probar envío real desde el sitio en producción
- Verificar que llega email a `mesaentrada@municipiosantarosa.gob.ar`
- Verificar respuesta UI (éxito / error)

## Rollback
- Cambio solo en `FormularioContacto.jsx` + `contacto.ashx` + `Web.config`
- Git revert si algo falla

---

## Datos necesarios del cliente / hosting
Antes de implementar, confirmar:
1. **SMTP host** (ej: `smtp.ferozo.com`, `mail.municipiosantarosa.gob.ar`, etc.)
2. **Puerto** (587 TLS / 465 SSL / 25)
3. **Usuario / password** SMTP
4. **From address** permitido (algunos hosts exigen que coincida con la cuenta)

---

## Próximo paso
Plan listo para implementación. Ejecutar cuando se tengan los datos SMTP.