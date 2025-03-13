//Importa el modulo de autenticación
const {auth} = require('express-openid-connect');

//Configuracion para la autenticacion de auth0
const config = {
  //la auth no es obligatoria para todas las rutas
  authRequired: false,
  //El usuario se redirige a logouth al salir de la sesion
  auth0Logout: true,
  //Validacion de la sesion
  secret: process.env.CLIENT_SECRET,
  //URL Base de la aplicacion a la que se redirije
  baseURL: 'http://localhost:3005',
  //ID de la aplicacion
  clientID: process.env.CLIENT_ID,
  //Proveedor de la autenticacion --> auth0
  issuerBaseURL: process.env.DOMAIN,
  routes: {
    postLogoutRedirect: 'http://localhost:3005/v1/home'
  }

};

const setUpAuthentication =  (app) =>{
  //Usa el middleware auth para configurar la autenticacion
  app.use(auth(config)); //config -- parametros implementados

  //Verifica si el usuario esta autenticado
  app.use((req, res, next) => {
    //Guarda un valor booleano en una variable para las vistas
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    next();
  });
  
};

module.exports = setUpAuthentication;