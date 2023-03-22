import mongoose  from 'mongoose'


const prodcutosSchema = new mongoose.Schema({

    nombre : {type: String, required: true},
    descripcion : {type: String, required: true},
    codigo: {type: Number, required: true},
    foto : {type: String},
    precio : {type: Number, required: true},
    stock: {type: Number, required : true}
    },

    {
        timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }

})


export const prodcutModel = mongoose.model(
    'productos',
    prodcutosSchema
)