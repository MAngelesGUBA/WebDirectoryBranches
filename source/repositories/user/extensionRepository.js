const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 
 * @param {string} search - query to search
 * @returns {Promise<object[]>} existing record | null
 * @throws {Error} throw an error if it happens
 */
const getBranchExtension = async (param,search)=>{
  try{
    const branchExtension = await prisma.extension.findMany({
      where: {
        AND: [
          { branch: { branchName_Unaccent: { contains: param, mode: 'insensitive' } } },
          {
            OR: [
              { employeeName: { contains: search, mode: 'insensitive' } },
              { position: { contains: search, mode: 'insensitive' } },
              { area: { areaName_Unaccent: { contains: search, mode: 'insensitive' } } }
            ]
          }
        ]
      },
      include:{
        area:true,
        branch:true
      } 
    })
    return branchExtension;
  }catch(error){
    throw error;
  }
}

module.exports = {
  getBranchExtension
}