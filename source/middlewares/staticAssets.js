const express = require('express'); 
const path = require('path');

//Establece la ruta de los elementos public | asigna un alias
const setUpStaticAssets = (app) =>{

  /*
    Express.static --> se encarga de servir archivos estaticos para
    acceder a ellos desde las rutas del servidor
   */
  app.use('/assets',express.static(path.join(__dirname, '../../public'))); 
}

module.exports = setUpStaticAssets; 