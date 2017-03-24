/**
 * Staging environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
	port: process.env.PORT || 1500,
    connections: {
        mongodb: {
            adapter: 'sails-mongo',
            url: process.env.MONGO_URL,
            mongos: {
                ssl: true,
                sslValidate: false
            }
        },
    },
    models: {
        connection: 'mongodb',
    },
    session: {
        adapter: 'redis',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: 4,
        pass: process.env.REDIS_PASSWORD,
        prefix: 'simple_staging_sess:'
    },
    sockets: {
        adapter: 'socket.io-redis',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: 5,
        pass: process.env.REDIS_PASSWORD,
    }
};
