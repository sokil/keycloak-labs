const unleash = require('unleash-server');

const keycloakAuthHook = require('./keycloak-auth-hook');

unleash.start({
    db: {
        user: 'unleash_user',
        password: 'some_password',
        host: 'unleash_postgres',
        port: 5432,
        database: 'unleash',
        ssl: false,
    },
    authentication: {
        type: 'custom',
        customAuthHandler: keycloakAuthHook,
    },
    server: {
        enableRequestLogger: true,
        baseUriPath: '',
    },
    logLevel: 'info',
});