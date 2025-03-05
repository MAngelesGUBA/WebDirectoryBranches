class Validation{
  /**
   * @param {object} validation schema 
   */
  constructor(schema){
    this.schema = schema;
  }

  /**
   * @param {object} data to validate
   * @returns {string|null} error messages string or null if there aren't
   */
  _getValidateErrors(data){
    const {error} = this.schema.validate(data, {
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
}

module.exports = Validation;