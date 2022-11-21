import io from "socket.io-client"

const connectionOptions =  {
    "transports" : ["websocket"]
};

export const socket = io(`${process.env.REACT_APP_BASE_URL}`, connectionOptions);