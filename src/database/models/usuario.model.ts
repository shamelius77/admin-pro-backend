import  { Schema, model, Document } from 'mongoose';

const UsuarioSchema = new Schema({

    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    }

});

// metodo que no permite manipular el modelo a lo que queremos mostrar como salida, sin afectar a la base de datos
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } =  this.toObject(); 
    object.uid = _id
    return object
} )


export interface IUser extends Document{
    nombre:     string;
    email:      string;
    password:   string;
    img:        string;
    role:       string;
    google:     boolean;
}


export default  model<IUser>('Usuario', UsuarioSchema);
