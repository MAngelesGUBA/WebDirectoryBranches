const generalResponse = require('../../DTOs/generalResponse');
const dtoGetBranchExtension = require('../../DTOs/user/getBranchExtension');
const extensionRepository = require('../../repositories/user/extensionRepository');

const getBranchExtension = async(req, res) => {
  const response = new generalResponse(res);
  try{
    const dtoGet = new dtoGetBranchExtension(req.params, req.query);
    const error = dtoGet.validate();
    if(error){
      return response.sendErrorMessage(400, 'Error en la validación de los datos', error);
    }
    const branchExtension = await extensionRepository.getBranchExtension(dtoGet.getQuery().param, dtoGet.getQuery().search);
    if(branchExtension.length === 0){
      return response.sendErrorMessage(404, 'No se encontraron registros', null);
    }
    return response.sendResponse(200, 'Registros encontrados', branchExtension);
  }catch(error){
    console.log(error);
    return response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}

module.exports = { getBranchExtension };