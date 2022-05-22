import {io} from "socket.io-client";

const config = {
                transports: ['websocket', 'polling', 'flashsocket'], 
                forceNew: true
                };

const socket = io("http://localhost:8080", config);

export default socket;