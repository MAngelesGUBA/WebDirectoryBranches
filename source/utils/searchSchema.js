const joi = require('joi');

//Define el esquema de validacion para la la busqueda de una extension
const schema = joi.object({
  search: joi.string().trim().pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]{2,30}$/).required().messages({
    'any.required': 'La búsqueda es requerida', 
    'string.pattern.base': 'La búsqueda debe contener solo letras',
    'string.empty': 'El campo búsqueda no debe estar vacío'
  })
});

module.exports = schema;
