import axios from 'axios';
import {conf} from './config';

class ApiService {

  rootPath;

  constructor() {
    this._init();
  }

  async get(key, params={}, config={}, useCache=true) {
    const endpoint  = conf.endpoints[key];

    let sessionKey = conf.sessionPrefix ? conf.sessionPrefix  + '-' : '';
    sessionKey += params.id ? key + '-' + params.id : key;

    const inSession  = endpoint.isCached && useCache && this._getSession(sessionKey);
    if (inSession) {
      return inSession;
    }

    const path   = this._endpointPath(endpoint, params);
    const result = await axios.get(path, config);
 
    if (result.status > 200) {
      console.error('Api call returned an error', result);
      throw result;
    }

    const value  = result.data;
    
    if (endpoint.isCached) {
      this._setSession(sessionKey, value);
    }

    return value;
  }

  async post(key, params={}, body={}, config={}) {
    const endpoint  = conf.endpoints[key];

    const path   = this._endpointPath(endpoint, params);
    const result = await axios.post(path, body, config);

    return result.data;
  }

  async put(key, params={}, body={}, config={}) {
    const endpoint  = conf.endpoints[key];

    const path   = this._endpointPath(endpoint, params);
    const result = await axios.put(path, body, config);

    return result.data;
  }

  async delete(key, params={}) {
    const endpoint  = conf.endpoints[key];

    const path   = this._endpointPath(endpoint, params);
    const result = await axios.delete(path);

    return result.data;
  }

  _init() {
    this.rootPath = process.env.REACT_APP_API_URL.replace(new RegExp('/$'), '');
    if (!this.rootPath) {
      console.error('Unable to set the API root path', process.env);
    }
  }

  _endpointPath(endpoint, params) {
    const paramsKeys  = Object.keys(params);
    const queryParams = [];
    let   path        = endpoint.path;

    paramsKeys.forEach(key => {
      const value  = params[key];
      const regExp = new RegExp(':' + key + '?(?=/|$)');

      if (regExp.test(path) && value) {
        path = path.replace(regExp, value);

      } else if (regExp.test(path)) {
        const regExpWithSlash = new RegExp('/:' + key + '?(?=/|$)');
        path = path.replace(regExpWithSlash, '');
        
      } else {
        queryParams.push(key + '=' + value);
      }
    });

    let finalPath = this.rootPath + '/' + path;
    if (queryParams.length) {
      finalPath += '?' + queryParams.join('&');
    }

    return finalPath;
  }

  _getSession(key) {
    const encoded = sessionStorage.getItem(key) || false;
    return encoded && JSON.parse(encoded);
  }

  _setSession(key, value) {
    const encoded = JSON.stringify(value);
    return sessionStorage.setItem(key, encoded);
  }
}

const apiSrv = new ApiService();
export default apiSrv;

