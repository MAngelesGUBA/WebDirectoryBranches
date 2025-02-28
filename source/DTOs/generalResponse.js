class GeneralResponse{
  /**
   * @param {Object} response - Express response object
   */
  //Obtiene el objeto response para la peticion
  constructor(response){
    this.response = response;
  }

  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Response message
   * @param {object|null} data - Optional data (default null)
   * @returns {Object} JSON response
   */
  //retorna la respuesta a la peticion | datos del msj dinamicos
  sendResponse(statusCode, message, data=null){
    return this.response.status(statusCode).json({message:message,data:data});
  }

  /**
   * 
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {string} error - Error details
   * @returns {Object} JSON response
   */
  //Retorna un mensaje de error | detalle del error dinamico
  sendErrorMessage(statusCode,message,error=''){
    return this.response.status(statusCode).json({message:message,error:error}); 
  }
}

module.exports = GeneralResponse; 