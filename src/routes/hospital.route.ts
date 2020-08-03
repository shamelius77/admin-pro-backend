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

        this.router.get('/', validarJwt,  hospitalesCtrll.getHospitales) ;

        this.router.post('/', [
            validarJwt,
            check('nombre', 'el nombre de hospital es obligatorio').not().isEmpty(),
            validarCampos

        ],
        hospitalesCtrll.postHospital) ;

        this.router.put('/:id',  hospitalesCtrll.putHospital) ;
        this.router.delete('/:id',  hospitalesCtrll.deleteHospital) ;
       
    }

};

const hospitalesClass =  new HospitalesClass();

export default hospitalesClass;

