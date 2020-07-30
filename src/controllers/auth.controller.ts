import {Response, Request } from 'express';

import Usuario from '../database/models/usuario.model';
import bcrypt from 'bcryptjs';
import generarJwt  from '../helpers/jwt'

const postAuth = async (req:Request, res:Response)=>{

    const { password, email } = req.body

    try {

        // verificar email
        const usaurioDB = await Usuario.findOne({email});

        if (!usaurioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido'
            })

        };
        
        // verificar password
        const validPass = bcrypt.compareSync(password, usaurioDB.password);

        if (!validPass){
            return res.status(400).json({
                ok: false,
                msg: 'password no valido'
            });
        }

        // generar TOKEN
        const token = await generarJwt(usaurioDB.id)


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


export default {
    postAuth
}