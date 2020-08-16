import {Response, Request } from 'express';
import mongoose from 'mongoose';


import generarJwt  from '../helpers/jwt'

// importar el modelo de usuarios
import Hospital from '../database/models/hospital.model'


 const getHospitales = async (req:Request, res:Response, )=>{

   const hospitales =  await Hospital.find()
                                .populate('usuario', 'nombre img')
    

    res.status(200).json({
        ok: true,
        hospitales,
    })     
};

const postHospital = async (req:Request, res:Response, )=>{

    const uid = req.body.uid;
    const hospital = new Hospital({
             usuario: uid,  
             ...req.body 
            })

    try {

        // buscar si no existe hospital

      const existeHospital =   await Hospital.findOne( {nombre:  req.body.nombre} )

        if (existeHospital){
            return res.status(400).json({
                    ok:     false,
                    msg:    'Ya existe el Hospital con ese nombre'
            })
        }
        
        const hospitalGrabado =   await hospital.save();
 
 
         res.status(200).json({
             ok: true,
             hospitalGrabado
         })   

        }  
     catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        })  
        }

};

const putHospital = async (req:Request, res:Response, )=>{

        const id = req.params.id;
        const uid = req.body.uid;
   
    try {

        if (!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(404).json({
                ok : false,
                msg: 'Error, el ID proporcionado no es valido'
            })
        }
        const hospitalDB = await Hospital.findById({_id: mongoose.Types.ObjectId(id)}  );

        if (!hospitalDB){

           return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado',
                id
            })     

        }
        const cambiosHospital = {
            ...req.body,
            usuario:  uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true})


        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        })     
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        })  
    }
   
};

const deleteHospital = async (req:Request, res:Response, )=>{

        const id = req.params.id;
   
    try {

        if (!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(404).json({
                ok : false,
                msg: 'Error, el ID proporcionado no es valido'
            })
        }
        const hospitalDB = await Hospital.findById({_id: mongoose.Types.ObjectId(id)}  );

        if (!hospitalDB){

           return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado',
                id
            })     

        }

        const hospitalEliminado = await Hospital.findByIdAndDelete(id)


        res.status(200).json({
            ok: true,
            msg: 'hospital eleiminado',
            hospital: hospitalEliminado
        })     
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        })  
    }    
};


export default { 
    getHospitales, 
    postHospital,
    putHospital,
    deleteHospital
    }