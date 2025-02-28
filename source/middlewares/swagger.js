/*
  * Genera doc OpenAPI a partir de comentarios en el codigo
  * Define un archivo de conf para visualizar la doc
*/
const swaggerJsDoc = require('swagger-jsdoc');
/*Proporciona una interfaz visual para la doc de la API a partir
de una conf tipo JSON*/
const swaggerUi = require('swagger-ui-express');
//Importa el archivo con opciones de conf para generar la doc de la API
const swaggerOptions = require('../config/v1/swaggerJsDoc');

//Genera doc tipo JSON apartir de las opciones del archivo de conf 
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setUpSwagger = (app) =>{
  /*
    * Permite visualizar la doc swagger en /v1/api-docs
    * swaggerUi.serve --> Sirve archivos estaticos (HTML, CSS, JS) etc
    * swaggerUi.setup --> Conf swagger ui con el archivo json de conf
  */
  app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
  //Esta es la ruta http://localhost:3005/v1/api-docs
};

module.exports = setUpSwagger;