import { Router } from 'express';

import  authCtrll  from '../controllers/auth.controller'
import { check } from 'express-validator';
import validarCampos  from '../middlewares/validar-campos';


class AuthClass{

    public router:Router;

    constructor(){
        this.router =  Router();
        this.routes();
    }
    
    routes(){
        
        this.router.post('/', 
        [
            check('email',      'El email es obligatorio').isEmail(),
            check('password',   'El password es obligatorio').not().isEmpty(),
            validarCampos
        ] , 
        authCtrll.postAuth ) ;
       
    }

};

const authClass =  new AuthClass();

export default authClass;

