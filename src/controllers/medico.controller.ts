import {Response, Request } from 'express';

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

    // const Medicos = await Hospital.find({} )

    res.status(200).json({
        ok: true,
        msg: 'put  Medicos',
    })     
};
const deleteMedico = async (req:Request, res:Response, )=>{

    // const Medicos = await Hospital.find({} )

    res.status(200).json({
        ok: true,
        msg: 'delete Medicos',
    })     
};
 

export default { 
    getMedicos, 
    postMedico,
    putMedico,
    deleteMedico
    }