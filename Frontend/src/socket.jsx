import io from "socket.io-client";

let socket;
let isConnected = false;

const connectSocket = (user_id, onConnect) => {
    socket = io("https://chat-app-backend-jt1c.onrender.com", {
        query: `user_id=${user_id}`
    });

    socket.on('connect', () => {
        console.log("Socket connected");
        isConnected = true;
        if (typeof onConnect === "function") {
            onConnect(true);
        }
    });

    socket.on('disconnect', () => {
        console.log("Socket disconnected");
        isConnected(false);
        if (typeof onConnect === "function") {
            onConnect(false);
        }
    });
}

export { socket, connectSocket, isConnected };
