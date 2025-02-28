import io from "socket.io-client";

let socket;

const connectSocket = (user_id, onConnect) => {
    socket = io("https://chatappbackend-olive.vercel.app", {
        query: `user_id=${user_id}`
    });

    socket.on('connect', () => {
        console.log("Socket connected");
        if (typeof onConnect === "function") {
            onConnect();
        }
    });

    socket.on('disconnect', () => {
        console.log("Socket disconnected");
    });
}

export { socket, connectSocket };
