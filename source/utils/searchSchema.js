const joi = require('joi');

//Define el esquema de validacion para la la busqueda de una extension
const schema = joi.object({
  search: joi.string().trim().pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]{2,30}$/).required().messages({
    'any.required': 'La busqueda es requerida', 
    'string.pattern.base': 'La busqueda debe contener solo letras, números y espacios',
    'string.empty': 'El campo busqueda, no debe estar vacío'
  })
});

module.exports = schema;
