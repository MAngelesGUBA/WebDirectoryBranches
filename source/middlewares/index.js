//Importa conf de middlewares
const setUpAthentication = require('./auth0');
const setUpBodyParser = require('./bodyParser');
const setUpHearders = require('./hearder');
const setUpStaticAssets = require('./staticAssets');
const setUpSwagger = require('./swagger');
const setUpSeo = require('./seoConfig');
//Ejecuta los middlewares importados
const setUpMiddlewares = (app)=>{
  //Configura la autenticacion de usuarios
  setUpAthentication(app); 
  //Configura el manejo de datos en el cuerpo de la solicitud 
  setUpBodyParser(app);
  //Sirve los archivos estaticos
  setUpStaticAssets(app);
  //Configuracion de seguridad en headers
  setUpHearders(app);
  //Configura la documentación de la API 
  setUpSwagger(app);
  // Configuración del SEO para la renderización de las vistas
  app.use(setUpSeo);
}

module.exports = setUpMiddlewares;