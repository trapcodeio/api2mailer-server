/**
 * @param next
 * @param {DollarSign} $
 * @returns {*}
 */
module.exports = (next, $) => {
  /**
   * Check for env.json
   * @type {any}
   */
  const configFile = $.path.base('env.json');
  
  if (!$.file.exists(configFile)) {
    
    console.log();
    $.logWarning(`Config file {env.json} does not exist!`);
    $.logWarning(`Run "xjs @ makeConfig"`);
    console.log();
    
    return $.exit();
  }
  
  const config = $.file.readJson(configFile);
  
  // Use port from config
  $.config.set('server.port', config.port);
  
  // Save config to env.json
  $.config.set('env.json', config);
  
  return next();
};