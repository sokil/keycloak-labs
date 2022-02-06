const unleash = require('unleash-server');

const keycloakAuthHook = require('./keycloak-auth-hook');

unleash.start({
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