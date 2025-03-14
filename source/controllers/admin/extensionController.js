const generalResponse = require('../../DTOs/generalResponse');
const dtoGetExtension = require('../../DTOs/getRequest');
const dtoInsertExtension = require('../../DTOs/admin/extension/insertRequest');
const dtoUpdateExtension = require('../../DTOs/admin/extension/updateRequest');
const extensionRepository = require('../../repositories/admin/extensionRespository');
const generalRepository = require('../../repositories/generalExtensions');
const area_branchRepository = require('../../repositories/admin/area_branchRepository'); 

//ENDPOINTS VISTAS -----------------------------------------------------------------------------
const viewAdmin = (req, res)=>{
  res.render('pages/admin/adminExtensions',{
    title: 'Administración de Extensiones',
    viewName: 'viewsAdminExtensions'
  });
}

// EXTENSION -----------------------------------

const getExtension = async(req, res) =>{
  //Instancia de la clase generalResponse
  const response = new generalResponse(res);
  try{
    //Instancia de la clase dtoGetArea
    const dtoGet = new dtoGetExtension(req.query);
    
    //Validación de los datos
    const error = dtoGet.validate(); 
    //Si hay error en la validación, se envía un mensaje de error
    if(error){
      return response.sendErrorMessage(400, 'Error en la validación de los datos', error);
    }

    //Se obtienen los registros de la base de datos
    const extension = await generalRepository.getExtension(dtoGet.getQuery());
    //Si no hay registros, se envía un mensaje de error
    if(extension.length === 0){
      return response.sendErrorMessage(404, 'No se encontraron registros', null);
    }

    //Si hay registros, se envía un mensaje de éxito
    return response.sendResponse(200, 'Registros encontrados', extension);
  }catch(error){ //Si hay un error en el proceso, se envía un mensaje de error
    return response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}

//Registro de una extensión
const insertExtension = async(req, res) =>{
  const response = new generalResponse(res);
  try{
    const dtoInsert = new dtoInsertExtension(req.body);
    const error = dtoInsert.validate(); 
    const insertData = dtoInsert.getInsertData();
    if(error){
      return response.sendErrorMessage(400, 'Error al registrar la extensión', error);
    }

    const existSucursal = await area_branchRepository.findByIdBranch(insertData.fk_idBranch);
    if(!existSucursal){
      return response.sendErrorMessage(400, 'La sucursal no existe', null);
    }

    const existArea = await area_branchRepository.findByIdArea(insertData.fk_idArea);
    if(!existArea){
      return response.sendErrorMessage(400, 'El área no existe', null);
    }

    const existNumExtension = await extensionRepository.findByNumExtension(insertData.extension);
    if(existNumExtension){
      return response.sendErrorMessage(400, 'El número de extensión ya existe', null); 
    }

    const newExtension = await extensionRepository.insertExtension(dtoInsert.getInsertData());
    return response.sendResponse(200, 'Extensión registrada', {id:newExtension}); 
  }catch(error){
    console.log(error);
    return response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}

//Actualización de una extensión
const updateExtension = async(req, res) =>{
  const response = new generalResponse(res);
  try{
    const dtoUpdate = new dtoUpdateExtension(req.body, req.params);
    const dataUpdate = dtoUpdate.getUpdateData();

    const existsExtension = await extensionRepository.findExtensionById(dtoUpdate.getUpdateIdData());
    if(!existsExtension){
      return response.sendErrorMessage(400, 'El registro no existe', null);
    }

    const error = dtoUpdate.validate();
    if(error){
      return response.sendErrorMessage(400, 'Error en la actualización de los datos', error);
    }

    const existBranch = await area_branchRepository.findByIdBranch(dataUpdate.fk_idBranch);
    if(!existBranch){
      return response.sendErrorMessage(400, 'La sucursal no existe', null);
    }

    const existArea = await area_branchRepository.findByIdArea(dataUpdate.fk_idArea);
    if(!existArea){
      return response.sendErrorMessage(400, 'El área no existe', null);
    }

    if(existsExtension.extension !== dataUpdate.extension){
      const existNumExtension = await extensionRepository.findByNumExtension(dataUpdate.extension);
      if(existNumExtension){
        return response.sendErrorMessage(400, 'El número de extensión ya existe', null);
      }
    }
    const updatedId = await extensionRepository.updateExtension(dtoUpdate.getUpdateIdData(), dataUpdate);
    return response.sendResponse(200, 'Extensión actualizada', {id:updatedId}); 
  }catch(error){
    console.log(error);
    return response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}

//Eliminación de una extensión
const deleteExtension = async(req, res) =>{
  const response = new generalResponse(res);
  try{
    const existsExtension = await extensionRepository.findExtensionById(req.params.id);
    if(!existsExtension){
      return response.sendErrorMessage(400, 'El registro no existe', null);
    }
    const deletedId = await extensionRepository.deleteExtension(req.params.id);
    return response.sendResponse(200, 'Extensión eliminada', {id:deletedId}); 
  }catch(error){
    return response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}

// AREA -----------------------------------

const getArea = async(req,res) =>{
  const response = new generalResponse(res);
  try{
    const area = await area_branchRepository.getArea();
    response.sendResponse(200,'Áreas obtenidas correctamente',area);
  }catch(error){
    response.sendErrorMessage(500,'Error interno del servidor', error.message);
  }
};

// SUCURSAL -----------------------------------
const getBranch = async(req,res) =>{
  const response = new generalResponse(res);
  try{
    const branch = await area_branchRepository.getBranch();
    response.sendResponse(200, 'Sucursales obtenidas correctamente', branch);
  }catch(error){
    response.sendErrorMessage(500, 'Error interno del servidor', error.message);
  }
}


module.exports = {
  viewAdmin,
  getExtension,
  insertExtension,
  updateExtension,
  deleteExtension, 
  getArea,
  getBranch
};