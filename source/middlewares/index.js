//Importa conf de middlewares
const setUpBodyParser = require('./bodyParser');
const setUpStaticAssets = require('./staticAssets');

//Ejecuta los middlewares importados
const setUpMiddlewares = (app)=>{
  //Configura el manejo de datos en el cuerpo de la solicitud 
  setUpBodyParser(app);
  //Sirve los archivos estaticos
  setUpStaticAssets(app); 
}

module.exports = setUpMiddlewares;