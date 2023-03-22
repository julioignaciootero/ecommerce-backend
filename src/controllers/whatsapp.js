import dotenv from 'dotenv';
import { twilioClient } from "../services/wspservices.js";
import { logger } from "../config/logs.js";
dotenv.config();


export const sendWS = async(user, carrito)  => {
    try {
      const message = {
        body: `Pedido ${carrito._id} completado con exito! Gracias por confiar en nosotros`,
        from: process.env.CEL,
        to: 'whatsapp:+5491121714727',
      };
      const response = await twilioClient.messages.create(message);
      logger.info("Wsp enviado")
    //   res.json(response);
    } catch (error) {
      console.log(error);
    }
}