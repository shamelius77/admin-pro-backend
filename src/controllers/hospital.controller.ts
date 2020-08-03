import {Response, Request } from 'express';


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

    // const hospitales = await Hospital.find({} )

    res.status(200).json({
        ok: true,
        msg: 'put  hospitales',
    })     
};
const deleteHospital = async (req:Request, res:Response, )=>{

    // const hospitales = await Hospital.find({} )

    res.status(200).json({
        ok: true,
        msg: 'delete hospitales',
    })     
};

// const postHospital = async (req:Request, res:Response, )=>{

//     const { nombre, img, usuario } = req.body;

//     try{  
        
//         const existNomb = await Hospital.findOne({nombre});

//         if (existNomb) {
//                 return res.status(400).json({
//                     ok: false,
//                     msg: 'el hospital ya existe'
//                 })
//         }

//         const hospital = new Hospital(req.body);
        
//         await hospital.save();
        
//         // generar TOKEN
//         // const token = await generarJwt(usuario.id)
        
//         res.status(200).json({
//             ok: true,
//             hospital
//         })     

//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({
//                 ok: false,
//                 msg: 'Error ...... revisar log'
//         })

//     }


// };

 

export default { 
    getHospitales, 
    postHospital,
    putHospital,
    deleteHospital
    }