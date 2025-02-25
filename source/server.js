//carga las variables de entorno al contexto de process.env | utilización de manera global
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000; 

app.listen(PORT, ()=>{
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
}); 