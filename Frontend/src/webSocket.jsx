let ws = null;

export const getWebSocket = (userID) => {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
        console.log('Creating new WebSocket connection');
        ws = new WebSocket(`ws://localhost:4001?userID=${userID}`);
        
        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            ws = null; // Reset ws to null on close, so it can reconnect
        };
    }

    return ws;
};