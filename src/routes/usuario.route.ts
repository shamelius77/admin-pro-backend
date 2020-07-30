import  { Router } from 'express' ; 
import { check } from 'express-validator';

import  usuariosCtrll  from '../controllers/usuario.controller'
import  validarCampos  from '../middlewares/validar-campos'
import validarJwt from '../middlewares/validar-jwt';


class UsuariosClass{

    public router:Router;

    constructor(){
        this.router =  Router();
        this.routes();
    }
    
    routes(){
        
        this.router.get('/', validarJwt,  usuariosCtrll.getUsuarios) ;
       
        this.router.post('/', [
                    check('nombre',     'El nombre es obligatorio').not().isEmpty(),
                    check('password',   'El password es obligatorio').not().isEmpty(),
                    check('email',      'El email es obligatorio').isEmail()
                    ],
                    validarCampos,
                    usuariosCtrll.postUsuario ) ;

         this.router.put('/:id', validarJwt,
                    [
                        check('nombre',     'El nombre es obligatorio').not().isEmpty(),                  
                        check('email',      'El email es obligatorio').isEmail(),
                        check('role',       'El role es obligatorio').not().isEmpty(),
                     ],
                     validarCampos,
                    usuariosCtrll.updUsuarios) ;

        this.router.delete('/:id' , validarJwt, usuariosCtrll.delUsuario )
    }

};

const usuarioClass =  new UsuariosClass();

export default usuarioClass;

