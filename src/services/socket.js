import { Server } from "socket.io";
import { logger } from "../config/logs.js";

//Logica de Socket pára chat
let io;

export const initWsServer = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    logger.info("Nueva conexion");

    socket.on("enviarmensaje", async (msg) => {
      io.emit("mensajenuevo", msg);
    });
  });

  return io;
};

export const socketEmit = (eventName, msg) => {
  io.emit(eventName, msg);
};
