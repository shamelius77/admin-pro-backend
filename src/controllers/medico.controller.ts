import {Response, Request } from 'express';
import mongoose from 'mongoose';

import generarJwt  from '../helpers/jwt'

// importar el modelo de medicos
import Medico from '../database/models/medico.model'



 const getMedicos = async (req:Request, res:Response, )=>{

    try {

       const medicos = await Medico.find()
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre')

        res.status(200).json({
            ok: true,
            medicos,
        })  

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:     false,
            msg:    'Error inesperado, hablar con el administrador'
        })    
    }

      
};
const postMedico = async (req:Request, res:Response, )=>{

    const uid = req.body.uid;
    const hospitalID = req.body.hospitalID;

    const medico = new Medico({
        hospital: hospitalID,
        usuario: uid,
        ...req.body
    });
   
    try {

        const medicoGrabado =   await medico.save();

        res.status(200).json({
            ok:         true,
            medico:     medicoGrabado
        })     
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:     false,
            msg:    'Error, hablar con el administrador'
        })    

    }





};
const putMedico = async (req:Request, res:Response, )=>{
    const id = req.params.id;   // id del medico
    const uid = req.body.uid;   // id del usaurio, este viene del JWT
    const hospitalID = req.body.hospital;


try {

    if (!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({
            ok : false,
            msg: 'Error, el ID proporcionado no es valido'
        })
    }
    const medicoDB = await Medico.findById({_id: mongoose.Types.ObjectId(id)}  );

    if (!medicoDB){

       return res.status(404).json({
            ok: true,
            msg: 'Medico no encontrado',
            id
        })     

    }
    const cambiosMedico = {
        ...req.body,
        medico:  uid
    }



    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})


    res.status(200).json({
        ok: true,
        hospital: medicoActualizado
    })     
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error.- hablar con el Administrador',
    })  
}
};
const deleteMedico = async (req:Request, res:Response, )=>{

    const id = req.params.id;   // id del medico    

try {

    if (!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({
            ok : false,
            msg: 'Error, el ID proporcionado no es valido'
        })
    }
    const medicoDB = await Medico.findById({_id: mongoose.Types.ObjectId(id)}  );

    if (!medicoDB){

       return res.status(404).json({
            ok: true,
            msg: 'Medico con ese ID no fue encontrado',
            id
        })     

    }
   
    const medicoEliminado = await Medico.findByIdAndDelete(id)


    res.status(200).json({
        ok: true,
        hospital: medicoEliminado
    })     
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        })  
    };
 
};

export default { 
    getMedicos, 
    postMedico,
    putMedico,
    deleteMedico
    }