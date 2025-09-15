export { renderers } from '../../renderers.mjs';

async function getResendInstance() {
  try {
    const { Resend } = await import('resend');
    const { getEnvConfig } = await import('../../chunks/env_h7UKDnml.mjs');
    const config = getEnvConfig();
    const resend = new Resend(config.resendApiKey);
    console.log("Resend inicializado correctamente");
    return { resend, config };
  } catch (error) {
    console.error("Error al inicializar Resend:", error);
    throw new Error("Error al inicializar el servicio de correo");
  }
}
function validateFormData(data) {
  const errors = [];
  if (!data.firstName?.trim()) {
    errors.push("El nombre es requerido");
  }
  if (!data.lastName?.trim()) {
    errors.push("El apellido es requerido");
  }
  if (!data.email?.trim()) {
    errors.push("El correo electrónico es requerido");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("El correo electrónico no tiene un formato válido");
  }
  if (!data.message?.trim()) {
    errors.push("El mensaje es requerido");
  }
  if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
    errors.push("El teléfono no tiene un formato válido");
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function generateEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo mensaje de contacto - IgnuxLab</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        .title {
          color: #495057;
          font-size: 18px;
          margin: 0;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 5px;
          display: block;
        }
        .field-value {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 4px;
          border-left: 4px solid #007bff;
        }
        .message-field {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          border-left: 4px solid #28a745;
          white-space: pre-wrap;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          text-align: center;
          color: #6c757d;
          font-size: 14px;
        }
        .timestamp {
          color: #6c757d;
          font-size: 12px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">IgnuxLab</div>
          <h1 class="title">Nuevo mensaje de contacto</h1>
        </div>

        <div class="field">
          <span class="field-label">Nombre completo:</span>
          <div class="field-value">${data.firstName} ${data.lastName}</div>
        </div>

        <div class="field">
          <span class="field-label">Correo electrónico:</span>
          <div class="field-value">${data.email}</div>
        </div>

        ${data.phone ? `
        <div class="field">
          <span class="field-label">Teléfono:</span>
          <div class="field-value">${data.phone}</div>
        </div>
        ` : ""}

        ${data.company ? `
        <div class="field">
          <span class="field-label">Empresa/Organización:</span>
          <div class="field-value">${data.company}</div>
        </div>
        ` : ""}

        <div class="field">
          <span class="field-label">Mensaje:</span>
          <div class="message-field">${data.message}</div>
        </div>

        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de contacto de <strong>ignuxlab.com</strong></p>
          <div class="timestamp">
            Enviado el ${(/* @__PURE__ */ new Date()).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
function generateEmailText(data) {
  return `
Nuevo mensaje de contacto - IgnuxLab

Nombre completo: ${data.firstName} ${data.lastName}
Correo electrónico: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ""}
${data.company ? `Empresa/Organización: ${data.company}` : ""}

Mensaje:
${data.message}

---
Este mensaje fue enviado desde el formulario de contacto de ignuxlab.com
Enviado el ${(/* @__PURE__ */ new Date()).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}
  `;
}
const POST = async ({ request }) => {
  try {
    console.log("POST request recibida en /api/contact");
    if (request.method !== "POST") {
      console.log("Método no permitido:", request.method);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Método no permitido"
        }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const formData = await request.formData();
    console.log("Datos del formulario recibidos:", Object.fromEntries(formData.entries()));
    const contactData = {
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || void 0,
      company: formData.get("company") || void 0,
      message: formData.get("message") || ""
    };
    const validation = validateFormData(contactData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Datos inválidos",
          details: validation.errors
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("Obteniendo instancia de Resend...");
    const { resend, config } = await getResendInstance();
    console.log("Configuración obtenida:", {
      contactEmail: config.contactEmail,
      fromEmail: config.fromEmail,
      nodeEnv: config.nodeEnv
    });
    console.log("Enviando correo con Resend...");
    const emailResult = await resend.emails.send({
      from: config.fromEmail,
      to: [config.contactEmail],
      subject: `Nuevo mensaje de contacto de ${contactData.firstName} ${contactData.lastName}`,
      html: generateEmailHTML(contactData),
      text: generateEmailText(contactData),
      replyTo: contactData.email
    });
    console.log("Resultado del envío de correo:", emailResult);
    if (emailResult.error) {
      console.error("Error al enviar correo:", emailResult.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error al enviar el correo",
          details: emailResult.error
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Mensaje enviado exitosamente",
        emailId: emailResult.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error en el endpoint de contacto:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
