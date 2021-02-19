/**
 * Your Config File.
 * See https://xpresserjs.com/configuration/
 */
module.exports = {
    // name of app
    name: 'Api 2 Smtp',
    
    mailer: {},

    // app environment (development|production)
    env: 'production',

    /**
     * By default xpresser sets this for you.
     */
    server: {
        domain: 'localhost',
        // Server Port
        port: 2222,
        
        use: {cors: true}
    },

    /**
     * Path settings.
     */
    paths: {
        /**
         * Base Folder
         * Where this app is called from.
         *
         * Best value for this is: __dirname
         */
        base: __dirname,
    }
};
