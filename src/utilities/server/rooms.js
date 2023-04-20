// Endpoints:
const BASE_URL = '/server/rooms';
// Imports:
import sendRequest from '../sendReq';

/* All functions use sendRequest, and return the output. */

// POSTs new chatroom data to BASE_URL/new endpoint:
export function createChatroom(CreateRoomPackage) {
    return sendRequest(`${BASE_URL}/new`, 'POST', CreateRoomPackage);    
}