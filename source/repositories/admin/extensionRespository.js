const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


/* C R U D --> EXTENSIONS ---------------------------------*/

/**
 * 
 * @param {number} Extension to verify
 * @returns {Promise<object|null>} existing record | null
 * @throws {Error} throw an error if it happens
 */
//Validación de extensión ######################
const findByExtension = async (extension) =>{
  try{
    const existExtension = await prisma.extension
    .findUnique({
      where:{
        extension:extension
      }
    });
    return existExtension; 
  }catch(error){
    throw error;
  }
}

/**
 * 
 * @param {object} dataExtension 
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

module.exports = {
  findByExtension,
  insertExtension
}

