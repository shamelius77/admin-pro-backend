import {Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

import generarJwt  from '../helpers/jwt'

// importar el modelo de usuarios
import Usuario from '../database/models/usuario.model'
import Medico from '../database/models/medico.model'
import Hospital from '../database/models/hospital.model'
// importar de helpers
import actualizarImagen from '../helpers/actualizar-img';


const putFileUpload = async (req:Request, res:Response, )=>{
   
    const tipo   = req.params.tipo;
    const id     = req.params.id;
    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){

       return res.status(400).json({
            ok: false,
            msg: 'el tipo no es medico, ni usuario , ni hospital'
        })  

    }
    // validar que si exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos para hacer uploads'
        })

    }

    /// Procesar la imagen......

    const file:any = req.files.imagen;

    const nombreCortado = file.name.split('.');  // archivo.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo))
    {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });

    }

    // Generar nombre de archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`

    // Definir el Path donde se guarda la imagen
    const path = `./src/uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err:any)=> {
       
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            }); 
        }

        // Actualizar en la base de datos
        
        actualizarImagen(tipo, id, nombreArchivo);


    
        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })

      });
     
  
};


const retornaImagen = (req:Request, res:Response)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // validar si existe el path
    if(fs.existsSync(pathImg) ){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/imagenes/no-img.jpg`);
        res.sendFile(pathImg);
    }

};


 
export default { 
    putFileUpload, 
    retornaImagen
           
    }