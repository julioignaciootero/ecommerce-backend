import { Server } from "socket.io";

let io;

export const initWsServer = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Nueva conexion");
    console.log(new Date());

    socket.on("enviarmensaje", async (msg) => {
      console.log("on enviarmensaje");
      io.emit("mensajenuevo", msg);
    });
  });

  return io;
};

export const socketEmit = (eventName, msg) => {
  io.emit(eventName, msg);
};
