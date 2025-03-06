const Validation = require('../../../utils/validationClass');
const schema = require('../../../utils/extensionSchema');

class UpdateRequest extends Validation{

  /**
   * @param {object } body - Express request obj
   * @param {object} params id - Express request obj
   */
  constructor(body, params){
    //Ejecuta el constructor de la clase padre y le pasa el schema de validacion
    super(schema)
    //Asigna a cada propiedad el valor correspondiente recibido en la peticion
    this.id = Number(params.id);
    this.fk_idBranch = Number(body.branch);
    this.employeeName = body.employee;
    this.fk_idArea = Number(body.area);
    this.position = body.position;
    this.extension = Number(body.extension);
  }

  /**
   * @returns {object} updateData - object with the data to update
   */
  getUpdateData(){
    //retorna el objeto con los datos a actualizar
    return {
      fk_idBranch: this.fk_idBranch,
      employeeName: this.employeeName,
      fk_idArea: this.fk_idArea,
      position: this.position,
      extension: this.extension
    };
  }

  getUpdateIdData(){
    return this.id;
  }

  /**
   * @returns {string} errors  - string with errors
   */
  validate(){
    return this._getValidateErrors(this.getUpdateData());
  }
}

module.exports = UpdateRequest;