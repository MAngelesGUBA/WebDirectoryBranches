const helmet = require('helmet');

const setUpHeaders = (app) => {
  app.use(
    helmet({
      // Hide X-Powered-By header
      hidePoweredBy: true,

      // Strict Transport Security - only in production
      hsts: process.env.NODE_ENV === 'production' ? {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true
      } : false,

      // Prevent browsers from trying to detect MIME types
      xContentTypeOptions: true,
      //noSniff: true,

      // Prevent clickjacking
      frameguard: {
        action: 'deny'
      },

      // Content Security Policy
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", 'https://cdn.jsdelivr.net'],
          objectSrc: ["'none'"],
          mediaSrc: ["'none'"],
          frameSrc: ["'none'"]
        }
      },

      // Disable features
      permissionsPolicy: {
        features: {
          camera: ['none'],
          geolocation: ['none'],
          microphone: ['none'],
          payment: ['none'],
          usb: ['none'],
          vibrate: ['none'],
          notifications: ['none']
        }
      },

      // Referrer policy
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin'
      },

      // Cross-origin policies
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      crossOriginResourcePolicy: { policy: 'same-origin' },

      // Remove legacy headers
      ieNoOpen: false,
      xssFilter: false
    })
  );
  app.use((req, res, next,)=>{
    res.setHeader('X-Content-Type-Options','nosniff');
    next();
  });
};

module.exports = setUpHeaders;


