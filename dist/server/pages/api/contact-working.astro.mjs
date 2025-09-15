export { renderers } from '../../renderers.mjs';

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
        /* Reset y configuración base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #ffffff;
          background: linear-gradient(135deg, #161426 0%, #342E59 50%, #2d1b69 100%);
          margin: 0;
          padding: 20px;
          min-height: 100vh;
        }
        
        /* Contenedor principal con estilo IgnuxLab */
        .container {
          max-width: 700px;
          margin: 0 auto;
          background: linear-gradient(135deg, 
            rgba(22, 20, 38, 0.95) 0%, 
            rgba(52, 46, 89, 0.9) 100%);
          border: 2px solid rgba(216, 35, 255, 0.3);
          border-radius: 25px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 40px rgba(216, 35, 255, 0.2);
        }
        
        /* Efectos de fondo decorativos */
        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #D823FF, #FF8A4C, #D823FF);
          opacity: 0.9;
          box-shadow: 0 2px 15px rgba(216, 35, 255, 0.4);
        }
        
        .container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(216, 35, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 138, 76, 0.06) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        
        /* Header con gradiente de texto */
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 30px;
          position: relative;
          z-index: 1;
        }
        
        .logo {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #D823FF, #FF8A4C, #ffffff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 15px;
          text-shadow: 0 0 30px rgba(216, 35, 255, 0.3);
          display: inline-block;
        }
        
        .title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 24px;
          font-weight: 600;
          background: linear-gradient(135deg, #D823FF, #FF8A4C);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0;
          position: relative;
        }
        
        .title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #D823FF, #FF8A4C);
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(216, 35, 255, 0.4);
        }
        
        /* Campos del formulario */
        .field {
          margin-bottom: 25px;
          position: relative;
          z-index: 1;
        }
        
        .field-label {
          font-weight: 600;
          color: #FF8A4C;
          margin-bottom: 8px;
          display: block;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .field-value {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 15px 20px;
          color: #ffffff;
          font-size: 16px;
          backdrop-filter: blur(10px);
          border-left: 4px solid #D823FF;
          transition: all 0.3s ease;
        }
        
        .message-field {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          color: #ffffff;
          font-size: 16px;
          backdrop-filter: blur(10px);
          border-left: 4px solid #FF8A4C;
          white-space: pre-wrap;
          line-height: 1.6;
          min-height: 120px;
        }
        
        /* Footer con estilo IgnuxLab */
        .footer {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid rgba(216, 35, 255, 0.3);
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          position: relative;
          z-index: 1;
        }
        
        .footer p {
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .footer strong {
          color: #D823FF;
          font-weight: 600;
        }
        
        .timestamp {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          margin-top: 15px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          border: 1px solid rgba(216, 35, 255, 0.2);
        }
        
        /* Efectos de hover para elementos interactivos */
        .field-value:hover,
        .message-field:hover {
          border-color: rgba(216, 35, 255, 0.4);
          box-shadow: 0 0 20px rgba(216, 35, 255, 0.2);
          background: rgba(255, 255, 255, 0.15);
        }
        
        /* Responsive design */
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          
          .container {
            padding: 25px;
            border-radius: 20px;
          }
          
          .logo {
            font-size: 28px;
          }
          
          .title {
            font-size: 20px;
          }
          
          .field-value,
          .message-field {
            padding: 12px 15px;
            font-size: 14px;
          }
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
          <span class="field-label">Nombre completo</span>
          <div class="field-value">${data.firstName} ${data.lastName}</div>
        </div>

        <div class="field">
          <span class="field-label">Correo electrónico</span>
          <div class="field-value">${data.email}</div>
        </div>

        ${data.phone ? `
        <div class="field">
          <span class="field-label">Teléfono</span>
          <div class="field-value">${data.phone}</div>
        </div>
        ` : ""}

        ${data.company ? `
        <div class="field">
          <span class="field-label">Empresa/Organización</span>
          <div class="field-value">${data.company}</div>
        </div>
        ` : ""}

        <div class="field">
          <span class="field-label">Mensaje</span>
          <div class="message-field">${data.message}</div>
        </div>

        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de contacto de <strong>ignuxlab.com</strong></p>
          <div class="timestamp">
            📧 Enviado el ${(/* @__PURE__ */ new Date()).toLocaleString("es-CO", {
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
╔══════════════════════════════════════════════════════════════╗
║                    🚀 IGNUXLAB - CONTACTO                    ║
╚══════════════════════════════════════════════════════════════╝

📧 NUEVO MENSAJE DE CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 INFORMACIÓN DEL CONTACTO:
   • Nombre completo: ${data.firstName} ${data.lastName}
   • Correo electrónico: ${data.email}
${data.phone ? `   • Teléfono: ${data.phone}` : ""}
${data.company ? `   • Empresa/Organización: ${data.company}` : ""}

💬 MENSAJE:
   ${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Enviado el ${(/* @__PURE__ */ new Date()).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}

🌐 Este mensaje fue enviado desde el formulario de contacto de ignuxlab.com

💜 Gracias por contactar con IgnuxLab - Transformamos ideas en realidad
  `;
}
const POST = async ({ request }) => {
  try {
    console.log("POST request recibida en /api/contact-working");
    if (request.method !== "POST") {
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
    const apiKey = "re_YJUTY3Lo_3XCrkHrudzycYPbnGzJSkYjd";
    const fromEmail = "onboarding@resend.dev";
    const toEmail = "programador3@ainteractivo.com";
    const emailData = {
      from: fromEmail,
      to: [toEmail],
      subject: `Nuevo mensaje de contacto de ${contactData.firstName} ${contactData.lastName}`,
      html: generateEmailHTML(contactData),
      text: generateEmailText(contactData),
      replyTo: contactData.email
    };
    console.log("Enviando correo con fetch a Resend API...");
    console.log("From:", fromEmail);
    console.log("To:", toEmail);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });
    const result = await response.json();
    console.log("Respuesta de Resend API:", result);
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error al enviar el correo",
          details: result,
          status: response.status
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
        emailId: result.id
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
