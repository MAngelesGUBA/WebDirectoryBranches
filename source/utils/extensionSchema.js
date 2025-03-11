const Joi = require('joi');
//Define el esquema de validacion para la data de una extension
const schema = Joi.object({
  fk_idBranch: Joi.number().required().integer().positive().messages({
    'any.required': 'La sucursal es requerida',
    'number.base': 'La sucursal debe ser un número',
    'number.integer': 'La sucursal debe ser un número entero',
    'number.positive': 'La sucursal debe ser un número positivo'
  }),
  email: Joi.string()
  .email({minDomainSegments:2, tlds:{allow:['com']}}).pattern(/@nissanrancagua\.[a-z]+$/i)
  .trim().required().messages({
    'string.email':'El formato del correo es incorrecto',
    'string.pattern.base': 'Dominio del correo incorrecto',
    'string.empty': 'El correo es requerido'
  }),
  employeeName: Joi.string().trim().pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,50}$/).required().messages({
    'string.empty': 'El nombre del empleado es requerido', 
    'string.pattern.base': 'El nombre del empleado no debe contener números ni caracteres especiales',
  }),
  fk_idArea: Joi.number().required().integer().positive().messages({
    'any.required': 'El área es requerida',
    'number.base': 'El área debe ser un número',
    'number.integer': 'El área debe ser un número entero',
    'number.positive': 'El área debe ser un número positivo'
  }),
  position: Joi.string().trim().pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,35}$/).required().messages({
    'string.empty': 'El campo posición, es requerido',
    'string.base': 'El puesto debe ser una cadena',
    'string.pattern.base': 'El puesto debe contener solo letras y espacios'
  }),
  extension: Joi.number().required().positive().integer().min(1000).max(6999).messages({
    'any.required': 'La extensión es requerida', 
    'number.base': 'La extensión debe ser un número',
    'number.integer': 'La extensión debe ser un número entero',
    'number.positive': 'La extensión debe ser un número positivo',
    'number.min': 'La extensión debe ser mayor a 1000',
    'number.max': 'La extensión debe ser menor a 7000'
  })
});

module.exports = schema; 