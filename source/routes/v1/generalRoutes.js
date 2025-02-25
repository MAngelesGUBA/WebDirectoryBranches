const express = require('express');
//instancia de router | manejo de endpoints de manera modularizada
const router = express.Router();

//Renderiza la vista home
router.get('/home',(req,res)=>{
  res.render('pages/index');
})

module.exports = router;