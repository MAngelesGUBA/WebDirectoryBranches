const schema = require('../../../utils/searchSchema');
const Validation = require('../../../utils/validationClass');

class GetRequest extends Validation{
  /**
   * @param {string} query - query to search
   */
  constructor(query){
    super(schema);
    this.search = query.search;
  }

  /**
   * @returns {string} query - query to search
   */
  getQuery(){
    return this.search;
  }

  /**
   * @returns {string} errors  - string with errors
   */
  validate(){
    return this._getValidateErrors({search: this.search});
  }
}

module.exports = GetRequest;