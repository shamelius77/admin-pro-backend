import  { Router } from 'express' ; 
import { check } from 'express-validator';

import  busquedasCtrll  from '../controllers/busqueda.controller'
import  validarCampos  from '../middlewares/validar-campos'
import validarJwt from '../middlewares/validar-jwt';


class BusquedasClass{

    public router:Router;

    constructor(){
        this.router =  Router();
        this.routes();
    }
    
    routes(){
        
        this.router.get('/:busqueda', validarJwt,  busquedasCtrll.getBusquedas) ;
        this.router.get('/coleccion/:tabla/:busqueda', validarJwt,  busquedasCtrll.getBusquedasColleccion) ;
       
      
    }

};

const busquedaClass =  new BusquedasClass();

export default busquedaClass;

