export function authHeader() {
    let acc_token = JSON.parse(sessionStorage.getItem('wm.auth'));

    // TODO: redirect incase of invalid token
    if (acc_token && acc_token.token) {
        return { 
            'Authorization': 'Bearer ' + acc_token.token,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}