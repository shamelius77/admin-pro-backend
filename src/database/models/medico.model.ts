import  { Schema, model, Document } from 'mongoose';

const MedicoSchema = new Schema({

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
    },
    hospital:{
        required:   true,
        type:       Schema.Types.ObjectId,
        ref:        'Hospital'  
    }
},) ;

// metodo que no permite manipular el modelo a lo que queremos mostrar como salida, sin afectar a la base de datos
MedicoSchema.method('toJSON', function(){
    const { __v, ...object } =  this.toObject(); 
    return object
} )


export interface IMedico extends Document{
    nombre:     string;
    img:        string;
    usuario:    string;
    hospital:   string;
}


export default  model<IMedico>('Medico', MedicoSchema);
