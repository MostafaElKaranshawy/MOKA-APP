import { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';
import WebSocket from 'ws';

let wss;
const clients = new Map();

const setWss = (server) => {
    wss = new WebSocketServer({ port: 4001 });
    wss.on('connection', (ws, req) => {
        const userID = req.url.replace('/?userID=', '');
        console.log("connected user ID: "+userID);
        // const userID = req.params.userID;
        clients.set(userID, ws); // Store the WebSocket connection
        //console.log("new client connected: "+userID);
        ws.on('close', () => {
            clients.delete(userID); // Remove the client on disconnect
        });
        ws.on('message', (message) => {
            //console.log(`Received message: ${message}`);
            // Respond to the message or broadcast to all clients
            ws.send('Message received');
        });
    });
}
const eventEmitter = new EventEmitter();

// Listen for events and broadcast messages
eventEmitter.on('broadcast', (message, userID) => {
    const clientSocket = clients.get(`${userID}`);
    console.log("current userID: "+userID);
    console.log(clientSocket)
    if (clientSocket && clientSocket.readyState === WebSocket.OPEN) {
        console.log("sending message to client: "+userID);
        clientSocket.send(JSON.stringify(message));
    }
});
export { setWss, wss, eventEmitter };
