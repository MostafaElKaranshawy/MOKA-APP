import { useEffect, useState } from "react";

const ws = new WebSocket("ws://localhost:4001");

console.log('WebSocket connection state:', ws.readyState);
ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

export default ws;