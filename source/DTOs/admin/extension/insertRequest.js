//Import schema validation
const schema = require('../../../utils/extensionSchema');
const Validation = require('../../../utils/validationClass');

//Verifica la estructura enviada en la peticion para insertar 
class InsertRequest extends Validation{
  /**
   * @param {object} body - Express request obj
   */
  //Constructor con los campos necesarios para la insercion
  //Los campos this.* deben ser nombrados como en la bd
  constructor(body){
    //Ejecuta el constructor de la clase padre y le pasa el schema de validacion
    super(schema);
    //Asigna a cada propiedad el valor correspondiente recibido en la peticion
    this.fk_idBranch = Number(body.branch);
    this.email = body.email.trim();
    this.employeeName = body.employee.trim();
    this.fk_idArea = Number(body.area);
    this.position = body.position.trim();
    this.extension = Number(body.extension);
  }

  getInsertData(){
    return {
      fk_idBranch: this.fk_idBranch,
      email: this.email,
      employeeName: this.employeeName,
      fk_idArea: this.fk_idArea,
      position: this.position,
      extension: this.extension
    };
  }
  
  /**
   * @returns {string} errors  - string with errors
   */
  validate(){
    return this._getValidateErrors(this.getInsertData());
  }
}

module.exports = InsertRequest;