import {Response, Request } from 'express';
import  bcrypt from 'bcryptjs'; 

import generarJwt  from '../helpers/jwt'

// importar el modelo de usuarios
import Usuario from '../database/models/usuario.model'
import Medico from '../database/models/medico.model'
import Hospital from '../database/models/hospital.model'


 const getBusquedas = async (req:Request, res:Response, )=>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

   const [usaurios, medicos, hospitales] = await Promise.all( [
        Usuario.find({ nombre: regex  }),
        Medico.find({ nombre: regex  }),
        Hospital.find({ nombre: regex  })
    ])

    // const usaurios = await Usuario.find({ nombre: regex  });
    // const medicos = await Medico.find({ nombre: regex  });
    // const hospitales = await Hospital.find({ nombre: regex  });



    res.status(200).json({
        ok: true,
        usaurios,
        medicos,
        hospitales
    })     
};

const getBusquedasColleccion = async (req:Request, res:Response, )=>{
    const tabla     = req.params.tabla
    const busqueda  = req.params.busqueda;
    const regex     = new RegExp(busqueda, 'i');

    let data:any[] = [];


    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex  })
                            .populate('usuario', 'nombre img')
                            .populate('hospital', 'nombre img')
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex  })
                                .populate('usuario', 'nombre img')
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex  });
            break;
        default:
           return res.status(400).json({
                ok: false,
                msk: 'La tabla tienen que ser Usuarios/Medicos/Hospitales',
            })     
    }

    res.status(200).json({
        ok: true,
        resultados: data,
    })  
 

  
};


 
export default { 
        getBusquedas, 
        getBusquedasColleccion   
    }