import passport from "passport";
import {UserModel} from "../models/user.js"
import {carritoModel} from "../models/carritos.js"
import {sendMailLogin , sendMailCompraFinalizada} from "../controllers/mail.js"
import { sendWS } from "./whatsapp.js";
import { logger } from "../config/logs.js";

const passportOptions = { badRequestMessage : 'Datos erroneso o incompletos'}

export const signUp = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if(err) {
            return next(err)
        }
        if(!user) return res.status(401).json(info);

        const envio = sendMailLogin(user)

        res.json({msg: 'signup OK'})
    })(req, res, next);
}

export const logIn = (req, res) => {
    res.status(200).json({msg: `Holis! ${req.username}`})
}

export const getHome = (req, res) => {
    res.status(200).json({session: req.session})
}


export const asignarCarrito = async(req, res) => {

    try {
        const { username , id_carrito } = req.body
        const user = await UserModel.findOne({ username : username})
        if (user) {
            
            const upd = await UserModel.findByIdAndUpdate(user._id,
                {
                    $addToSet: 
                    {
                        carritos: {
                            carrito: id_carrito,
                            estado: "Activo"
                        }
                    }
                }, { new : true})
            if (upd) {
                
                return res.status(200).json({
                    ok: true,
                    msg: "Carrito asignado correctamente",
                    user: upd
        
                })

            } else {
               return res.status(401).json({ok: false, msg: "Error al actualizar"}) 
            }

        } else {

            return res.status(404).json({ok: false, msg: "Erro al buscar el usuario"})

        }
    } catch (error) {
        logger.error(error)
    }
}


export const finalizarCompra = async(req, res) => {

    try {
        const { username , id_carrito } = req.body
        const user = await UserModel.findOne({ username : username})
        if (user) {
            
            const upd = await UserModel.findOneAndUpdate(
                { _id : user._id , "carritos.carrito" : id_carrito},
                {
                    $set: { "carritos.$.estado" : "Finalizada"}
                },
                { new : true}
            )

            if (upd) {
                
                res.status(200).json({
                    ok: true,
                    msg: "Compra finalizada",
                    user: upd
        
                })

                const car = await carritoModel.findById({_id : id_carrito})
                const envio = sendMailCompraFinalizada(user, car)
                sendWS(user, car)

            } else {
               return res.status(401).json({ok: false, msg: "Error, al finalizar compra"}) 
            }

        } else {

            return res.status(404).json({ok: false, msg: "Erro al buscar el usuario"})

        }
    } catch (error) {
        logger.error(error)
    }
}
