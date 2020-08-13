import {Response, Request } from 'express';
import  bcrypt from 'bcryptjs'; 
import mongoose from 'mongoose';

import generarJwt  from '../helpers/jwt'

// importar el modelo de usuarios
import Usuario from '../database/models/usuario.model'



 const getUsuarios = async (req:Request, res:Response, )=>{

    const desde = Number(req.query.desde) || 0;
  
  const [usuarios, total ] =  await Promise.all([
                Usuario.find({}, 'nombre email role google, img')
                                .skip(desde)
                                .limit(5),

                Usuario.find().countDocuments()

    ])

    res.status(200).json({
        ok: true,
        usuarios,
        total
    })     
};

 const postUsuario = async (req:Request, res:Response, )=>{

    const { password, email } = req.body;

    try{  
        
        const existEmail = await Usuario.findOne({email});

        if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'el correo ya existe'
                })
        }

        const usuario = new Usuario(req.body);

        console.log(password);

        // Encriptar password 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        
        await usuario.save();
        
        // generar TOKEN
        const token = await generarJwt(usuario.id)
        
        res.status(200).json({
            ok: true,
            usuario: usuario,
            token
        })     

    }
    catch(error){
        console.log(error);
        res.status(500).json({
                ok: false,
                msg: 'Error ...... revisar log'
        })

    }


};

 const updUsuarios = async (req:Request, res:Response)=>{

    // TODO: validar token

    const uid =  req.params.id;

    try {

        if (!mongoose.Types.ObjectId.isValid(uid)){
            return  res.status(404).json({
                ok : false,
                msg: 'Error, el ID proporcionado no es valido'
            })
        }
        
        const usuariosDB = await Usuario.findById( mongoose.Types.ObjectId(uid)  );

        if ( !usuariosDB ){
             return  res.status(404).json({
                ok : false,
                msg: 'No existe usuario con ese ID'
            })
        }

        // Actualizaciones
        const {google, password, email,  ...campos }  = req.body;

        if (usuariosDB.email !== email){
    
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail){
                return  res.status(400).json({
                    ok : false,
                    msg: 'Ya existe un usuario con ese email...'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})
  
        res.status(200).json({
            ok : true,
            usuario : usuarioActualizado
        })
          

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar log'
        })

    }

}

 const delUsuario = async (req:Request, res:Response)=>{

    const uid = req.params.id

    try {

        const usuariosDB = await Usuario.findById( uid );

        if ( !usuariosDB ){
             return  res.status(404).json({
                ok : false,
                msg: 'No existe usuario con ese ID'
            });
        }

        await Usuario.findByIdAndDelete(uid);


        res.status(200).json({
            ok: true,
            uid,
            msg: 'usuario eliminado'

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
                ok: false,
                msg: 'Error ...... revisar log'
        })
    }
}

export default { 
        getUsuarios, 
        postUsuario,
        updUsuarios,
        delUsuario
    }