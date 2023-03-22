import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { logger } from "../config/logs.js";



export const sendMailCompraFinalizada = async (user, carrito) => {

  try {
    
    let body = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>`
    body += "<h1>Compra finaliza</h1><br><br><p>Detalle de la compra</p><br><br>"
    body += "<table><tr><th>Producto</th><th>Cantidad</th>"
    
    carrito.productos.forEach(prod => {
      
      body += `<tr><td>${prod.producto}</td><td>${prod.cantidad}</td></tr>`

    });

    body += `</body>   </html>`


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
    
        user: 'oterojulioignacio@gmail.com',
        pass: process.env.MAIL_TOKEN
    
      }
    });

    const mailOptions = {
      from: 'Compras',
      to: user.email,
      subject: `Compra finalizada ${carrito._id} `,
      html : body,

    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        logger.error(error)
        return false
      } else {
        logger.info("Email enviado")
      }
    });

    body += "</table>"

    return true
  } catch (error) {
    logger.error(error)
    return false
  }

}

export const sendMailLogin = async ( user) => {
    
    try {


      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
      
          user: 'oterojulioignacio@gmail.com',
          pass: process.env.MAIL_TOKEN
      
        }
      });
        const mailOptions = {
            from: 'Info - Usuarios ',
            to: user.email,
            subject: "Nuevo usuario registrado 💙",
            html : `<h1>${user.nombre} ${user.apellido} acaba de unirse a la familia!!! </h1>`,
    
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              logger.error(error)
              return false
            } else {
              logger.info("Email enviad")
            }
          });
        return true
    } catch (error) {
      logger.error(error)
        return false
    }

    




}