const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
/**
 * @param {string} query - query to search
 * @returns {Promise<object[]>} existing record | null
 * @throws {Error} throw an error if it happens
 */
//Obetener extensiones ***********************
const getExtension = async (search, page=1) =>{
  try{
    const extension = await prisma.extension.findMany({
      where:{
        OR: [
          {employeeName: {contains: search, mode: 'insensitive'}},
          {position: {contains: search, mode: 'insensitive'}},
          {area:{areaName_Unaccent: {contains: search, mode: 'insensitive'}}},
          {branch:{branchName_Unaccent:{contains:search, mode:'insensitive'}}}
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

module.exports = { getExtension };