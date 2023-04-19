// Endpoints:
const BASE_URL = '/server/users';
// Imports:
import sendRequest from '../send-req';

/* All functions use sendRequest, and return the output. */

// POSTs userData to BASE_URL endpoint:
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

// POSTs credentials to BASE_URL/login endpoint:
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

// POSTs text query to BASE_URL/find-many endpoint:
export function findUsersPartial(txt) {
  return sendRequest(`${BASE_URL}/find-many`, 'POST', txt);
}

// PUTs userData at BASE_URL/data endpoint:
export function updateUserData(UDPackage) {
  return sendRequest(`${BASE_URL}/data`, 'PUT', UDPackage);
}

// GETs userData from BASE_URL/data endpoint:
export function getData() {
  return sendRequest(`${BASE_URL}/data`);
}

