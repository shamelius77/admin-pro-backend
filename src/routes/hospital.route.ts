import  { Router } from 'express' ; 
import { check } from 'express-validator';

import  hospitalesCtrll  from '../controllers/hospital.controller'
import validarCampos from '../middlewares/validar-campos';
import validarJwt from '../middlewares/validar-jwt';


class HospitalesClass{

    public router:Router;

    constructor(){
        this.router =  Router();
        this.routes();
    }
    
    routes(){

        // Listar hospitales
        this.router.get('/', validarJwt,  hospitalesCtrll.getHospitales) ;

        // Grabar un hospital
        this.router.post('/', [
            validarJwt,
            check('nombre', 'el nombre de hospital es obligatorio').not().isEmpty(),
            validarCampos

        ],
        hospitalesCtrll.postHospital) ;

        // Actualizar hospital
        this.router.put('/:id', [

            validarJwt,
            check('nombre', 'el nombre de hospital es obligatorio').not().isEmpty(),
            validarCampos


        ], hospitalesCtrll.putHospital) ;

        // Eliminar un hospital
        this.router.delete('/:id', validarJwt, hospitalesCtrll.deleteHospital) ;
       
    }

};

const hospitalesClass =  new HospitalesClass();

export default hospitalesClass;

