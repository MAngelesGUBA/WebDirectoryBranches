//Importa conf de middlewares
const setUpBodyParser = require('./bodyParser');
const setUpStaticAssets = require('./staticAssets');
const setUpSwagger = require('./swagger');
//Ejecuta los middlewares importados
const setUpMiddlewares = (app)=>{
  //Configura el manejo de datos en el cuerpo de la solicitud 
  setUpBodyParser(app);
  //Sirve los archivos estaticos
  setUpStaticAssets(app);
  //Configura la documentación de la API 
  setUpSwagger(app);
}

module.exports = setUpMiddlewares;