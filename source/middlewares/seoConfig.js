const seoConfig = require('../config/seo'); //Importa la ruta de archivo de configuracion de SEO

 //encapsula la función anonima
const setUpSeo = (req, res, next) =>{ 
  //variable temporal almacena la configuración de seo
  res.locals.seo = seoConfig;
  //Se dirige a la ruta destino
  next();
};

module.exports = setUpSeo;