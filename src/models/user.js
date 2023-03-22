import { Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const UserSchema = new Schema({

    username: { type: String , requried: true, unique : true},
    password: { type: String , requried: true},
    admin: { type: Boolean , default : false},
    email : { type : String, requried: true},
    nombre : { type: String },
    apellido : { type: String },
    direccion : { type: String} ,
    edad: {type: Number},
    telefono: { type: String} ,
    avatar: { type: String} ,
    carritos : [
        {   carrito : {type: mongoose.Schema.Types.ObjectId,
            ref: 'carritos',
            autopopulate: true,
            required : true},
            estado : { type : String}
        }
    ]



})


UserSchema.methods.encryptPassowrd = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}


UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const UserModel = model('users', UserSchema)