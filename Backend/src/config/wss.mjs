import { WebSocketServer } from 'ws';

let wss;
const setWss = (server) => {
    wss = new WebSocketServer({ port: 4001 });
    wss.on('connection', (ws) => {
        console.log('New client connected');
    
        // Simulate sending a message on some event or request
        // ws.send('Welcome to the WebSocket server');
    
        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);
            // Respond to the message or broadcast to all clients
            ws.send('Message received');
        });
    
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}
import { EventEmitter } from 'events';
import WebSocket from 'ws';
const eventEmitter = new EventEmitter();

// Listen for events and broadcast messages
eventEmitter.on('broadcast', (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
});
export { setWss, wss, eventEmitter };
