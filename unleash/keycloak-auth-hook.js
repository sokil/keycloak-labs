
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

'use strict';

/**
 * Keycloak hook for securing an Unleash server
 *
 * This example assumes that all users authenticating via
 * keycloak should have access. You would probably limit access
 * to users you trust.
 *
 * The implementation assumes the following environment variables:
 *
 *  - AUTH_HOST
 *  - AUTH_REALM
 *  - AUTH_CLIENT_ID
 */

const KeycloakStrategy = require('@exlinc/keycloak-passport');
const passport = require('passport');

const  { AuthenticationRequired } = require('unleash-server');

const host = process.env.AUTH_HOST;
const realm = process.env.AUTH_REALM;
const clientID = process.env.AUTH_CLIENT_ID;
const contextPath = process.env.CONTEXT_PATH || '';

function enableKeycloakOauth(app, config, services) {
    const { baseUriPath } = config.server;
    const { userService } = services;

    passport.use(
        'keycloak',
        new KeycloakStrategy(
            {
                host,
                realm,
                clientID,
                clientSecret: "not needed for standard flow but required by passport",
                callbackURL: `${contextPath}/api/auth/callback`,
                authorizationURL: `${host}/realms/${realm}/protocol/openid-connect/auth`,
                tokenURL: `${host}/realms/${realm}/protocol/openid-connect/token`,
                userInfoURL: `${host}/realms/${realm}/protocol/openid-connect/userinfo`,
                scope: 'openid profile email',
            },

            async (accessToken, refreshToken, profile, done) => {
                console.log("Access Token: " + accessToken);

                const user = await userService.loginUserWithoutPassword(profile.email, true);

                done(
                    null,
                    user,
                );
            },
        ),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    app.get('/api/admin/login', passport.authenticate('keycloak'));

    app.get(
        '/api/auth/callback',
        passport.authenticate('keycloak'),
        (req, res) => {
            res.redirect(`${contextPath}/`);
        },
    );

    app.use('/api', (req, res, next) => {
        if (req.user) {
            return next();
        }
        // Instruct unleash-frontend to pop-up auth dialog
        return res
            .status(401)
            .json(
                new AuthenticationRequired({
                    path: `${contextPath}/api/admin/login`,
                    type: 'custom',
                    message: `You have to identify yourself in order to use Unleash. 
                        Click the button and follow the instructions.`,
                }),
            )
            .end();
    });
}

module.exports = enableKeycloakOauth;
