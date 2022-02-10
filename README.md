# keycloak-labs

Integrate Keycloak with Unleash

## Services

| Service      | Description           |
|--------------|-----------------------|
| http://localhost:8080/ |  Keycloak | 
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

Create user `unleashtest` and password `unleashtest` that may be used for authentication to unleash

## RSA Key Generation

jwt private key:
openssl genpkey -out private.pem -algorithm rsa -pkeyopt rsa_keygen_bits:4096

jwt public key:
openssl pkey -in private.pem -out public.pem -pubout