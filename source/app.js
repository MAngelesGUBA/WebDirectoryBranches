require('dotenv').config();
//Importa express al contexto del proyecto
const express = require('express');
//Importa el modulo path -- Trabaja con rutas dentro del sistema de archivos
const path = require('path');
//Importa el archivo de conf principal para la ejecución de middlewares
const setUpMiddleware = require('./middlewares/index');
//Importa las rutas a utilizar
const generalRoutes = require('./routes/v1/generalRoutes');
const adminExtensionRoutes = require('./routes/v1/adminExtensionRoutes');
const userExtensionRoutes = require('./routes/v1/userExtensionRoutes');
//Importa el modulo de autenticación
const {auth} = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.CLIENT_SECRET,
  baseURL: 'http://localhost:3005' || process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.DOMAIN,
  routes: {
    postLogoutRedirect: 'http://localhost:3005/v1/admin/viewAdmin' || process.env.POST_LOGOUT_REDIRECT
  }
};

//Define una instancia de express
const app = express ();

//----------------------------------------------
//Establece el motor de vistas a implementar | PUG
app.set('view engine','pug');
app.set('views', path.join(__dirname,'./views'));

//--------------------------------------------------
//Establece los middlewares para su ejecución | pasa la instancia app
setUpMiddleware(app);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  next();
});

//--------------------------------------------------
//Establece ruta por defecto
app.get('/',(req,res)=>{
  res.redirect('/v1/home');
})

app.get('/logout', (req, res) => {
  console.log("LLego aqui");
  req.logout(); // Cierra sesión en Express
  res.redirect('/login'); 
});

//--------------------------------------------------
//Establece rutas a utilizar
app.use('/v1',generalRoutes);
app.use('/v1/admin',adminExtensionRoutes);
app.use('/v1/user',userExtensionRoutes);



module.exports = app;