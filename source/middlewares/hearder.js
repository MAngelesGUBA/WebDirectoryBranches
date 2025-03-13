const helmet = require('helmet');

const setUpHeaders = (app) => {
  // Basic Helmet configuration
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
      noSniff: true,

      // Prevent clickjacking
      frameguard: {
        action: 'deny'
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

      // Remove Content-Security-Policy
      contentSecurityPolicy: false,

      // Remove X-Download-Options
      ieNoOpen: false,

      // Remove X-XSS-Protection (modern browsers don't need it)
      xssFilter: false
    })
  );
};

module.exports = setUpHeaders;


