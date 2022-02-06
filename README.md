# keycloak-labs

Integrate Keycloak with Unleash

## Services

| Service      | Description           |
|--------------|-----------------------|
| http://localhost:8080/ |   KLeycloak | 
| http://localhost:4242/ | Unleash |

### Unleash

Unleash default credentials:

username: admin
password: unleash4all

### Keycloak

Keycloak default credentials:

username: keycloak
password: keycloak

#### Integration with unleash

Create realm `unleash` and client id `unleash`.

In client set `Valid Redirect URIs` to `http://localhost:4242/api/auth/callback`