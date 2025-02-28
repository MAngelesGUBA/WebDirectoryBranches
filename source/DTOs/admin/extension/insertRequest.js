//Import joi 
const Joi = require('joi');

//Verifica la estructura enviada en la peticion para insertar 
class InsertRequest{
  /**
   * 
   * @param {object} request - Express request obj
   */
  //Constructor con los campos necesarios para la insercion
  //Los campos this.* deben ser nombrados como en la bd
  constructor(body){
    this.fk_idBranch = body.branch;
    this.employeeName = body.employee;
    this.fk_idArea = body.area;
    this.position = body.position;
    this.extension = body.extension;
  }

  /**
   * 
   * @returns {object} validate Joi schema
   */
  //Metodo para validacion de datos con Joi
  
  _getSchema(){
    //Define schema de validacion
    const schema = Joi.object({
      fk_idBranch: Joi.number().integer().positive().required().messages({
        'number.base': 'La sucursal debe ser un número',
        'number.integer': 'La sucursal debe ser un número entero',
        'any.required': 'La sucursal es requerida', 
        'number.positive': 'La sucursal debe ser un número positivo'
      }),
      employeeName: Joi.string().trim().pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,50}$/).required().messages({
        'string.base': 'El nombre del empleado debe ser una cadena',
        'any.required': 'El nombre del empleado es requerido', 
        'string.pattern.base': 'El nombre del empleado debe contener solo letras y espacios'
      }),
      fk_idArea: Joi.number().integer().positive().required().messages({
        'number.base': 'El área debe ser un número',
        'number.integer': 'El área debe ser un número entero',
        'any.required': 'El área es requerida', 
        'number.positive': 'El área debe ser un número positivo'
      }),
      position: Joi.string().trim().pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,35}$/).required().messages({
        'string.base': 'El puesto debe ser una cadena',
        'any.required': 'El puesto es requerido', 
        'string.pattern.base': 'El puesto debe contener solo letras y espacios'
      }),
      extension: Joi.number().positive().integer().min(1000).max(7000).required().messages({
        'number.base': 'La extensión debe ser un número',
        'number.integer': 'La extensión debe ser un número entero',
        'any.required': 'La extensión es requerida', 
        'number.positive': 'La extensión debe ser un número positivo',
        'number.min': 'La extensión debe ser mayor a 1000',
        'number.max': 'La extensión debe ser menor a 7000'
      })
    });
    return schema;
  }

  /**
   * 
   * @param {Joi.schema} validate schema from Joi
   * @returns {string|null} error messages string or null if there aren't
   */
  _getValidateErrors(schema, data){
    const {error} = schema.validate(data, {
      abortEarly:false,
      //Evita la adicion de propiedades no definidas en el schema
      stripUnknown:true
    });
    if(error){ //si hay error
      //retorna una cadena con los mensajes de error
      return error.details.map(err => err.message).join('\n');
    }
    return null; // si no hay errores, regresa null
  }

  /**
   * 
   * @returns {string|null} error messages string or null if there aren't
   */
  validate(){
    const schema = this._getSchema();
    const messages = this._getValidateErrors(schema, this);
    return messages; 
  }
}

module.exports = InsertRequest;