const {Questionnaire} = require('semantic-inquirer');
// noinspection JSValidateJSDoc
/**
 *  Job: MakeConfig
 */
module.exports = {
  $: null,
  
  // Job Handler
  /**
   *
   * @param args
   * @param {JobHelper} job
   * @returns {Promise<void>}
   */
  async handler(args, job) {
    const $ = this.$ = job.$();
    
    const configFile = $.path.base('env.json');
    
    // Check if env file exists
    if ($.file.exists(configFile)) {
      const recheckConfig = await Questionnaire.yesOrNo(
          'env.json exists, do you want to overwrite?');
      
      if (recheckConfig) await this.makeConfig(configFile);
      
    } else {
      await this.makeConfig(configFile);
    }
    
    return job.end(true);
  },
  
  async makeConfig(configFile) {
    const $ = this.$;
    const envData = {
      port: 2222,
      transporters: {
        default: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'b75152cb9b90fe',
            pass: 'e445d878f87af7',
          },
        }
      },
    };
    
    $.file.saveToJson(configFile, envData, {checkIfFileExists: false});
    $.logSuccess('env.json created successfully');
  },
};
