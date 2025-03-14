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
app.get('/',(req,res)=>{
  res.redirect('/v1/home');
}); 

//--------------------------------------------------
//Establece rutas a utilizar
app.use('/v1',generalRoutes);
app.use('/v1/admin',adminExtensionRoutes);
app.use('/v1/user',userExtensionRoutes);

module.exports = app;