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
    if (res.ok) return res.json();
    // If res.ok false (Status 4xx), returns error:
    throw new Error('Bad Request');
}