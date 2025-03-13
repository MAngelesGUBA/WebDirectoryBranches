const helmet = require('helmet');

const setUpHeaders = (app) => {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"]
      }
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    permissionsPolicy: {
      features: {
        geolocation: [],
        microphone: [],
        camera: [],
        fullscreen: []
      }
    },
    hidePoweredBy: true, // Oculta "X-Powered-By"
    frameguard: { action: "deny" }, // Equivalente a X-Frame-Options: DENY
    xssFilter: true, // Protege contra ataques XSS
    noSniff: true // Equivalente a X-Content-Type-Options: nosniff
  }));

  // Agregar los encabezados que Helmet no maneja directamente
  app.use((req, res, next) => {
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('Server', ''); // Limpiar "Server" para ocultar información
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Añadir el encabezado correcto
    next();
  });

  // Desactivar el encabezado X-Powered-By manualmente
  app.disable('x-powered-by');
};

module.exports = setUpHeaders;


