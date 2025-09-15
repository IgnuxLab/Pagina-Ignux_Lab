const ROUTES = {
  HOME: {
    path: "/",
    name: "Inicio",
    title: "IgnuxLab - Laboratorio de Innovación Digital",
    description: "Transformamos ideas en soluciones digitales innovadoras. Laboratorio especializado en desarrollo web, móvil y tecnologías emergentes.",
    keywords: ["innovación digital", "desarrollo web", "laboratorio", "tecnología", "soluciones digitales"],
    isPublic: true,
    priority: 1
  },
  ABOUT: {
    path: "/about",
    name: "Nosotros",
    title: "Acerca de IgnuxLab - Nuestro Equipo y Misión",
    description: "Conoce nuestro equipo de expertos y nuestra misión de transformar el mundo digital a través de la innovación y la excelencia técnica.",
    keywords: ["equipo", "misión", "valores", "experiencia", "innovación"],
    isPublic: true,
    priority: 0.8
  },
  SOLUTIONS: {
    path: "/solutions",
    name: "Soluciones",
    title: "Soluciones Digitales - Servicios de IgnuxLab",
    description: "Descubre nuestras soluciones especializadas en desarrollo web, aplicaciones móviles, e-commerce y transformación digital.",
    keywords: ["desarrollo web", "aplicaciones móviles", "e-commerce", "transformación digital", "servicios"],
    isPublic: true,
    priority: 0.9
  },
  NEWS: {
    path: "/news",
    name: "Noticias",
    title: "Noticias y Actualizaciones - IgnuxLab",
    description: "Mantente al día con las últimas noticias, proyectos y actualizaciones de IgnuxLab.",
    keywords: ["noticias", "actualizaciones", "proyectos", "blog", "tecnología"],
    isPublic: true,
    priority: 0.7
  },
  CONTACT: {
    path: "/contact",
    name: "Contacto",
    title: "Contacto - Habla con IgnuxLab",
    description: "¿Tienes un proyecto en mente? Contáctanos y trabajemos juntos para hacerlo realidad.",
    keywords: ["contacto", "proyectos", "consultoría", "desarrollo", "colaboración"],
    isPublic: true,
    priority: 0.6
  },
  NOT_FOUND: {
    path: "/404",
    name: "Página no encontrada",
    title: "404 - Página no encontrada | IgnuxLab",
    description: "La página que buscas no existe. Regresa al inicio o explora nuestras soluciones.",
    keywords: ["404", "error", "página no encontrada"],
    isPublic: false,
    priority: 0.1
  }
};
function getPublicRoutes() {
  return Object.values(ROUTES).filter((route) => route.isPublic);
}
function getRoutesByPriority() {
  return getPublicRoutes().sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
function getRouteByPath(path) {
  return Object.values(ROUTES).find((route) => route.path === path);
}

export { ROUTES as R, getRoutesByPriority as a, getRouteByPath as g };
