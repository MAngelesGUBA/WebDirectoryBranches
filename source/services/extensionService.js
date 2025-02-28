const extensionRepository = require('../repositories/admin/extensionRespository'); 

class extensionService{
  /**
   * 
   * @param {number} extension 
   * @returns {Promise{object|null}} existing record | null
   */
  static async isExtensionUnique(extension){
    const existingExtension = await extensionRepository.findByExtension(extension);
    return existingExtension
  }

  /**
   * 
   * @param {object} dataExtension 
   * @returns {number} id new extension
   * @throws {Error} throw an error if it happens
   */
  static async insertExtension(dataExtension){
    const isUnique = await this.isExtensionUnique(dataExtension.extension);
    if(isUnique){
      throw new Error(`La extensión ${dataExtension.extension} ya existe`);
    }
    const idNewExtension = await extensionRepository.insertExtension(dataExtension); 
    return idNewExtension; 
  }
}


module.exports = extensionService;
