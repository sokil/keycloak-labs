# keycloak-labs

Integrate Keycloak with Unleash

## Services

Keycloak and Unleash need to communicate directly and through browser so we need to configure host names in `/etc/hosts`:
```
127.0.0.1 keycloak
127.0.0.1 unleash

```

| Service               | Description          |
|-----------------------|----------------------|
| http://keycloak:8080/ |   Keycloak | 
| http://unleash:4242/  | Unleash |

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

Create user, don't forget to set its email and change password.
