// Imports external methods:
import * as usersSCM from './server/users';

// User signUp method (exported):
export async function signUp(userData) {
    // Forwards request code to users API module:
    const token = await usersSCM.signUp(userData);
    // Persists token in local storage:
    localStorage.setItem('token', token);
    // Returns user token:
    return getUser();
}

// User getToken method (exported):
export function getToken() {
    // Returns no if no string is found:
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtains the payload of the token:
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    // Converts from miliseconds to seconds and checks if expired:
    if (payload.exp < Date.now() / 1000) {
        // Removes expired tokens from local:
        localStorage.removeItem('token');
        // Returns null because no valid token exists:
        return null;
    }
    // Successfully returns decoded token:
    return token;
}

// User getUser method (exported):
export function getUser() {
    // Refer to getToken:
    const token = getToken();
    // If there's a valid token, returns the user in the payload...
    //... otherwise returns null:
    return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
}

// User logOut method (exported):
export function logOut() {
    // Removes user token from local:
    localStorage.removeItem('token');
}

// User logIn method (exported):
export async function login(credentials) {
    // Forwards request code to users API module:
    const token = await usersSCM.login(credentials);
    // Persists token in local storage:
    localStorage.setItem('token', token);
    // Returns user token:
    return getUser();
}

// User checkToken method (exported):
export function checkToken() {
    // Returns promise...
    //... Then converts output to Date when resolved:
    return usersSCM.checkToken()
        .then(dateStr => new Date(dateStr));
}