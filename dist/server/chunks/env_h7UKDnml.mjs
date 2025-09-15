function getEnvConfig() {
  const resendApiKey = "re_YJUTY3Lo_3XCrkHrudzycYPbnGzJSkYjd";
  const contactEmail = "programador3@ainteractivo.com";
  const fromEmail = "noreply@ignuxlab.com";
  const nodeEnv = process.env.NODE_ENV || "development";
  if (nodeEnv === "development") {
    console.log("Configuración de entorno cargada:", {
      resendApiKey: "***configurada***" ,
      contactEmail,
      fromEmail,
      nodeEnv
    });
  }
  return {
    resendApiKey,
    contactEmail,
    fromEmail,
    nodeEnv
  };
}

export { getEnvConfig };
