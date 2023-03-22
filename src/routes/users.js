import passport from "passport";
import { Router } from "express";
import { signUp, logIn, getHome , asignarCarrito, finalizarCompra} from '../controllers/user.js'
import { isLoggedIn } from '../middlewares/user.js'
import router from "./productos.js";



const routerUser = Router()

const passportOptions = { badRequestMessage : 'Datos erroneso o incompletos'}


routerUser.post('/signup' , signUp)
routerUser.post('/login' , logIn)


routerUser.post('/asignarcarrito', asignarCarrito)
routerUser.post('/finalizarcompra', finalizarCompra)

export default routerUser