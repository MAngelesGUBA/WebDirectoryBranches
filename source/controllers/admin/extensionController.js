const generalResponse = require('../../DTOs/generalResponse');
const dtoInsertExtension = require('../../DTOs/admin/extension/insertRequest');
const extensionService = require('../../services/extensionService'); 

const insertExtension = async(req, res) =>{
  const response = new generalResponse(res);
  try{
    const dtoInsert = new dtoInsertExtension(req.body);
    const error = dtoInsert.validate()
    if(error){
      return response.sendErrorMessage(400, 'Error al registrar la extensión', error);
    }
    const newExtension = await extensionService.insertExtension(dtoInsert);
    return response.sendResponse(200, 'Extensión registrada', {id:newExtension}); 
  }catch(error){
    return response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}

module.exports = insertExtension;