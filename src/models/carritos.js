import mongoose  from 'mongoose'


const carritoSchema = new mongoose.Schema({

    productos : [
     { producto : {type: mongoose.Schema.Types.ObjectId,
                    ref: 'productos',
                    autopopulate: true,
                    required : true},
        cantidad : {type: Number , required : true}
     }
    ]
    
    },

    {
        timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }

})


export const carritoModel = mongoose.model(
    'carritos',
    carritoSchema
)