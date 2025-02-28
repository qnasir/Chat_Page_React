import io from "socket.io-client";

let socket;

const connectSocket = (user_id, onConnect) => {
    if (!user_id) {
        console.log("User ID is missing. Socket connection not started.");
        return;
    }
    socket = io("https://chatappbackend-olive.vercel.app", {
        query: {user_id}
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
