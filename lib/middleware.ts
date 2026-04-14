
/**
 * The opened routes which any client can reach whithout authorization, except refresh token where the token is checked directly from the http cookie 
 */
export const isPublicRoute=[
    'auth/login',
    'auth/register',
    'refresh-token'
]