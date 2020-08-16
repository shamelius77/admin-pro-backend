import  { Router } from 'express' ; 
import { check } from 'express-validator';

import  medicosCtrll  from '../controllers/medico.controller'
import validarCampos from '../middlewares/validar-campos';
import validarJwt from '../middlewares/validar-jwt';


class MedicosClass{

    public router:Router;

    constructor(){
        this.router =  Router();
        this.routes();
    }
    
    routes(){
        this.router.get('/',        medicosCtrll.getMedicos) ;
        this.router.post('/', [
                validarJwt,
                check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
                check('hospital', 'El hospital debe ser un ID valido').isMongoId(),
                validarCampos
            ],
              medicosCtrll.postMedico) ;


        this.router.put('/:id', [
            validarJwt,
            check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
            check('hospital', 'El hospital debe ser un ID valido').isMongoId(),
            validarCampos
        ],    medicosCtrll.putMedico) ;


        this.router.delete('/:id', validarJwt, medicosCtrll.deleteMedico) ;
       
    }

};

const medicosClass =  new MedicosClass();

export default medicosClass;

