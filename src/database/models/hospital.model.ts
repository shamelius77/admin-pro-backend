import  { Schema, model, Document } from 'mongoose';

const HospitalSchema = new Schema({

    nombre:{
        type:       String,
        required:   true
    },
    img:{
        type:       String
    },
    usuario:{
        required:   true,
        type:       Schema.Types.ObjectId,
        ref:        'Usuario'  
    }
}, {collection: 'hospitales'});

// metodo que no permite manipular el modelo a lo que queremos mostrar como salida, sin afectar a la base de datos
HospitalSchema.method('toJSON', function(){
    const { __v,  ...object } =  this.toObject(); 
    return object
} )


export interface IHospital extends Document{
    nombre:     string;
    img:        string;
    usuario:    string;
}


export default  model<IHospital>('Hospital', HospitalSchema);
