import passport from "passport";
import { Strategy as localStrategy} from "passport-local";
import { UserModel } from '../models/user.js'
import { logger } from "../config/logs.js";

const strategyOptions = {
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true,
}


const signup = async (req, username, password, done) => {

    try {
        const { nombre , apellido, direccion, edad, telefono, avatar, email } = req.body
        const newUser = new UserModel({username, password, nombre , apellido, email, direccion, edad, telefono, avatar})
        newUser.password = await newUser.encryptPassowrd(password)
        await newUser.save()
        return done(null, newUser)

    } catch (error) {
        logger.error(error)
        return done(null, false, { msg: "Error"})
    }

}


const login = async (req, username, password, done) => {

    const user = await UserModel.findOne({username})
    if(!user) {
        return done(null, false, { msg: "Usuario no encontrado"})
    } else {
        const match = await user.matchPassword(password)
        match ? done(null, user) : done(null, false)
    }
}


export const loginFunction = new localStrategy(strategyOptions , login)
export const signUpFunction = new localStrategy(strategyOptions , signup)


passport.serializeUser((user, done)=> {
    done(null, user._id)
})


passport.deserializeUser( async(userId, done) => {
    const user = await UserModel.findById(userId)
    return done(null, user)
})