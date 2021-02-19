const nodemailer = require('nodemailer');

/**
 * Report Progress Function.
 * @param {Mail.Options} mail
 * @param info
 */
function ReportProgress(mail, info) {
  console.log(`Mail Sent:`, {
    to: mail.to,
    subject: mail.subject,
    messageId: info.messageId,
  });
}

/**
 * MailerController
 */
module.exports = {
  // Controller Name
  name: 'MailerController',
  
  // Controller Default Service Error Handler.
  e: (http, error) => http.status(401).send({error}),
  
  middlewares: {
    ValidateRequestBody: ['sendMail'],
  },
  
  /**
   * Sends Email
   * @param {Xpresser.Http} http - Current Http Instance
   * @returns {*}
   */
  async sendMail(http) {
    /**
     * @type {Mail.Options}
     */
    const mail = http.state.get('mail');
    const transporter = http.state.get('transporter');
    const Transporter = nodemailer.createTransport(transporter);
    
    if (http.$body.has('background')) {
      
      Transporter.sendMail(mail).then(info => {
        ReportProgress(mail, info);
      }).catch(console.error);
      
      return http.send({message: 'Mail will be sent in background.'});
      
    } else {
      
      try {
        const info = await Transporter.sendMail(mail);
        ReportProgress(mail, info);
        return http.send(info);
      } catch (e) {
        console.error(e);
        return http.send({error: e.message});
      }
    }
  },
};
