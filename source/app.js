//Importa express al contexto del proyecto
const express = require('express');
//Importa el modulo path -- Trabaja con rutas dentro del sistema de archivos
const path = require('path');
//Importa el archivo de conf principal para la ejecución de middlewares
const setUpMiddleware = require('./middlewares/index');
//Importa las rutas a utilizar
const generalRoutes = require('./routes/v1/generalRoutes');

//Define una instancia de express
const app = express ();

//----------------------------------------------
//Establece el motor de vistas a implementar | PUG
app.set('view engine','pug');
app.set('views', path.join(__dirname,'./views'));

//--------------------------------------------------
//Establece los middlewares para su ejecución | pasa la instancia app
setUpMiddleware(app);

//--------------------------------------------------
//Establece ruta por defecto


//--------------------------------------------------
//Establece rutas a utilizar
app.use('/v1',generalRoutes);

module.exports = app;