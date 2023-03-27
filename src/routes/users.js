import passport from "passport";
import { Router } from "express";
import {
  signUp,
  logIn,
  asignarCarrito,
  finalizarCompra,
} from "../controllers/user.js";

const routerUser = Router();

const passportOptions = { badRequestMessage: "Datos erroneso o incompletos" };

routerUser.post("/signup", signUp);
routerUser.post(
  "/login",
  passport.authenticate("login", passportOptions),
  logIn
);

routerUser.post("/asignarcarrito", asignarCarrito);
routerUser.post("/finalizarcompra", finalizarCompra);

export default routerUser;
