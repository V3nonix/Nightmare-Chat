// Imports:
import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
    // Sets request method, defaults to GET:
    const options = { method };
    // If payload provided:
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
    // Checks for token:
    const token = getToken();
    // If a token exists:
    if (token) {
        // Ensure payload headers exist:
        options.headers = options.headers || {};
        // Adds token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }
    // Fetches at provided URL with options:
    const res = await fetch(url, options);
    // If res.ok, returns response parsed from JSON:
    if (res.ok) {
      return res.json();
    } else {
        // If res.ok false, returns error:
        if (res.status === 500) {
            // Status 500:
            throw new Error('Internal Server Error!');
        } else if (res.status === 401) {
            // Status 401:
            throw new Error(`${res.status} ||| Unauthorized! |||`);
        } else if (res.status < 500 && res.status > 300) {
            // Status 4xx:
            throw new Error(`${res.status} ||| Bad Request! |||`);
        } else {
            // Status ???:
            throw new Error(`${res.status} ||| Unexpected Error! |||`);
        }
    }
}

