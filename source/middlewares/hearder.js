const setUpHeaders = (app) => {
  app.use((req, res, next) => {
    // Basic security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Content Security Policy
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
      "img-src 'self'; " +
      "connect-src 'self'"
    );

    // Modern Permissions Policy (replacing Feature-Policy)
    res.setHeader('Permissions-Policy', 
      "geolocation=(), " +
      "microphone=(), " +
      "camera=(), " +
      "fullscreen=(self)"
    );

    // Clean up headers
    res.setHeader('Server', '');
    res.setHeader('X-Powered-By', '');

    next();
  });
};

module.exports = setUpHeaders;

