import {Response, Request } from 'express';

import Usuario from '../database/models/usuario.model';
import bcrypt from 'bcryptjs';
import generarJwt  from '../helpers/jwt'
import googleVerify from '../helpers/google-verify';



const postAuth = async (req:Request, res:Response)=>{

    const { password, email } = req.body

    try {

        // verificar email
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido'
            })

        };
        
        // verificar password
        const validPass = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPass){
            return res.status(400).json({
                ok: false,
                msg: 'password no valido'
            });
        }

        // generar TOKEN
        const token = await generarJwt(usuarioDB.id)


        res.status(200).json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado.......ver log'
        });
    }


}

const googleSignIn = async (req:Request, res:Response)=>{

    const googleToken = req.body.token;

    try {

      const {name, email, picture} = await googleVerify(googleToken);

      const usuarioDB = await Usuario.findOne({email});
      let usuario;

      if (!usuarioDB){
            // si no existe el usuario
            usuario = new Usuario({
                nombre : name,
                email,
                password: '@@@',
                img: picture,
                google: true,

            });
      }else{
          // si existe
          usuario = usuarioDB;
          usuario.google = true;
      }

      // guardar usuario en base de datos
      await usuario.save();

       // generar TOKEN
       const token = await generarJwt(usuario.id)

        res.status(200).json({
            ok: true,
            msg: 'Google SignIn',
            token
        })

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado en Google SignIn.....ver log'
        });

    }

}



const renewToken = async (req:Request, res:Response)=>{

    const uid =  req.body.uid;

    try {

         // generar TOKEN
      const token = await generarJwt(uid)
      
        res.json({
            ok: true,
            uid
        })



    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado del renewToken.......ver log'
        });
        
    }



}

export default {
    postAuth,
    googleSignIn,
    renewToken
}