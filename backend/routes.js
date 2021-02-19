const {getInstanceRouter} = require('xpresser');
/**
 * See https://xpresserjs.com/router/
 */
const router = getInstanceRouter();

/**
 * Url: "/" points to AppController@index
 * The index method of the controller.
 */
router.get('/', 'Mailer@sendMail').name('sendMail');
router.post('/', 'Mailer@sendMail').name('sendMail');
