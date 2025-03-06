const express = require('express');
const router = express.Router();

router.get('/viewExtension', async (req, res) => {
  res.render('pages/users/userExtensions', {
    title: 'Consulta de Extensiones',
    viewName: 'viewUserExtensions'
  });
});

module.exports = router;