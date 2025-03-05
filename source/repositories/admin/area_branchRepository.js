const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 
 * @param {number} idArea - area to verify
 * @returns {Promise<object|null>} existing record | null
 * @throws {Error} throw an error if it happens
 */
//VALIDACIONES --------------------------------------------------------------

//Obtener Area por ID ***************************
const findByIdArea = async (id) =>{
  try{
    const existArea = await prisma.area
    .findUnique({
      where:{
        id:id
      }
    });
    return existArea; 
  }catch(error){
    throw error;
  }
}

//Obtener sucursal por ID ***********************
const findByIdBranch = async (id) =>{
  try {
    const existBranch = await prisma.branch
    .findUnique({
      where:{
        id:id
      }
    });
    return existBranch;
  }catch(error){
    throw error
  }
}


// ----------------------------------------------------------------------

//obterner sucursal
/**
 * @returns {Promise<object[]>} existing record | null
 * @throws {Error} throw an error if it happens
 */

const getBranch  = async()=>{
  try{
    const branch = await prisma.branch.findMany({
      select:{
        id:true,
        branchName:true
      }
    })
    return branch;
  }catch(error){
    throw error;
  }
}

//Obtener area
/**
 * @returns {Promise<object[]>} existing record | null
 * @throws {Error} throw an error if it happens
 */

const getArea = async () =>{
  try{
    const area = await prisma.area.findMany({
      select:{
        id:true,
        areaName:true
      }
    })
    return area;
  }catch(error){
    throw error;
  }
}

module.exports = {
  getBranch,
  findByIdBranch,
  getArea,
  findByIdArea,
  
};