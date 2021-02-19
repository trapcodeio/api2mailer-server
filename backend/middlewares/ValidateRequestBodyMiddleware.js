const {Abolish} = require('abolish');
const {getInstance} = require('xpresser');
const $ = getInstance();
const envDotJson = $.config.newInstanceFrom('env.json');
const abolish = new Abolish();
abolish.config.useStartCaseInErrors = false;

/**
 * ValidateRequestBodyMiddleware
 */
module.exports = {
  
  /**
   * Default Middleware Action
   * @param {Xpresser.Http} http
   */
  allow(http) {
    
    if (http.req.method.toLowerCase() !== 'post') {
      return http.send({error: 'Accepts only POST requests!'});
    }
    
    if (!http.$body.has('mail')) {
      return http.send({error: '{mail} is required in requests body'});
    }
    
    let transporter = http.$body.get('transporter');
    
    if (typeof transporter === 'string') {
      const configKeyword = `transporters.${transporter}`;
      
      if (!envDotJson.has(configKeyword)) {
        transporter = 'default';
      }
      
      if (envDotJson.has(configKeyword)) {
        transporter = envDotJson.get(configKeyword);
      } else {
        throw Error(`Transport: "${transporter}" not found in env.json`);
      }
    }
    
    /**
     * Validate transport config.
     */
    // const [error] = abolish.validate(transporter, {
    //   '*': 'required|typeof:string',
    //   host: true,
    //   port: 'typeof:number',
    //   'auth.users': true,
    // });
    
    http.state.set({
      transporter,
      mail: http.$body.get('mail'),
    });
    
    return http.next();
  },
  
};
