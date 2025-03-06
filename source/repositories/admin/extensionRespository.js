const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// ----------------------------------------------------------------------
//VALIDACIONES
/**
 * 
 * @param {number} id - id Extension to find 
 * @returns {Promise<object|null>} existing record | null
 * @throws {Error} throw an error if it happens
 */
const findExtensionById = async (id) => {
  try {
    const extension = await prisma.extension.findUnique({
      where: { id: Number(id)}
    });
    return extension;
  } catch (error) {
    throw error;
  }
};

/**
 * 
 * @param {number} extension - Number extension to verify
 * @returns {Promise<object|null>} existing record | null
 * @throws {Error} throw an error if it happens
 */
//Validación de extensión ######################
const findByNumExtension = async (numExtension) =>{
  try{
    const existExtension = await prisma.extension
    .findUnique({
      where:{
        extension:numExtension
      }
    });
    return existExtension; 
  }catch(error){
    throw error;
  }
}

/* C R U D --> EXTENSIONS ---------------------------------*/

/**
 * 
 * @param {string} search - query to search
 * @returns {Promise<object[]>} existing record | null
 * @throws {Error} throw an error if it happens
 */
const getBranchExtension = async (param,search)=>{
  try{
    const branchExtension = await prisma.extension.findMany({
      select:{
        employeeName:true,
        area:{areaName:true},
        position:true,
        extension:true
      },
      where:{
        OR:[
          {employeeName: {contains: search, mode: 'insensitive'}},
          {position: {contains: search, mode: 'insensitive'}},
          {area:{areaName: {contains: search, mode: 'insensitive'}}},
          {branch:{branchName:{contains:param, mode:'insensitive'}}}
        ]
      },
      include:{
        area:true,
        branch:true
      }
    });
    return branchExtension;
  }catch(error){
    throw error;
  }
}

/**
 * @param {string} query - query to search
 * @returns {Promise<object[]>} existing record | null
 * @throws {Error} throw an error if it happens
 */
//Obetener extensiones ***********************
const getExtension = async (search) =>{
  try{
    const extension = await prisma.extension.findMany({
      where:{
        OR: [
          {employeeName: {contains: search, mode: 'insensitive'}},
          {position: {contains: search, mode: 'insensitive'}},
          {area:{areaName: {contains: search, mode: 'insensitive'}}},
          {branch:{branchName:{contains:search, mode:'insensitive'}}}
        ]
      },
      include:{
        area:true,
        branch:true
      } 
    })
    return extension;
  }catch(error){
    throw error;
  }
}

/**
 * 
 * @param {object} dataExtension - data to insert
 * @returns {Promise<number>} id of new extension
 * @throws {Error} throw an error if it happens
 */
//Inserción de una extension *********************
const insertExtension = async (dataExtension)=>{
  try{
    const newExtension = await prisma.extension
    .create({data:dataExtension});
    return newExtension.id;
  }catch(error){
    throw error; 
  }
}

//Actaulización de una extensión *********************
const updateExtension = async(id,extension) =>{
  try{
    const updateData = await prisma.extension
      .update({
        where:{id:Number(id)},
        data:extension
      }); 
      return updateData.id;
  }catch(error){
    throw error;
  }
};

/**
 * 
 * @param {number} id - Extension to delete
 * @returns {Promise<number>} id of the deleted extension
 * @throws {Error} throw an error if it happens
 */
//Eliminación de una extensión *********************
const deleteExtension = async(id) =>{
  try{
    const deleteExtension = await prisma.extension
      .delete({
        where:{id:Number(id)}
      });
      return deleteExtension.id;
  }catch(error){
    throw error;
  }
};

module.exports = {
  findByNumExtension,
  findExtensionById,
  getExtension,
  getBranchExtension,
  insertExtension,
  updateExtension,
  deleteExtension
}

