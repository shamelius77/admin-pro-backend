import  { Router } from 'express' ; 

import uploadsCtrll  from '../controllers/upload.controller'
import validarJwt from '../middlewares/validar-jwt';


class UploadsClass{

    public router:Router;

    constructor(){
        this.router =  Router();
        this.routes();
    }
    
    routes(){
        
        this.router.put('/:tipo/:id', validarJwt,  uploadsCtrll.putFileUpload) ;
        this.router.get('/:tipo/:foto',  uploadsCtrll.retornaImagen) ;
        
    }

};

const uploadsClass =  new UploadsClass();

export default uploadsClass;

