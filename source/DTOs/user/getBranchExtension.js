const schema = require('../../utils/searchSchema');
const Validation = require('../../utils/validationClass');

class GetBranchExtension extends Validation{
  /**
   * 
   * @param {string} params - params to search
   * @param {string} query - query to search
   */
  constructor(params, query){
    super(schema);
    this.param = params.sucursal;
    this.search = query.search;
  }

  /**
   * @returns {object} query - query to search
   */
  getQuery(){
    return {
      param: this.param,
      search: this.search
    }
  }

  /**
   * @returns {string} errors  - string with errors
   */
  validate(){
    return this._getValidateErrors({search: this.search});
  }
}

module.exports = GetBranchExtension;