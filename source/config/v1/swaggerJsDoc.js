const path = require('path'); //modulo de node.js para manejar rutas de archivos
const PORT = process.env.PORT||3000; 

const swaggerOptions={ //configuracion de swagger
  //En caso de no haber congruencia con la doc y la API, lo detecta
  failOnErrors:true,
  definition:{//Inf general de la API
    openapi: '3.0.0', //version OPENAPI
    info:{
      title:'API - DIRECTORIO',
      version: '1.0.0', //version de la API
      description: 'Primera version de la documentacion de la API para directorio web de sucursales'
    },
    servers:[ //Servidor en donde se encuentra la API
      {
        url:`http://localhost:${PORT}`
      }
    ]
  },
  //Archivos en donde se encuentra la API y doc de OPENAPI 
  apis:[path.join(__dirname,'../../routes/v1/*js')]
};

module.exports = swaggerOptions;