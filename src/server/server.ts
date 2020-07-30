
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import  configDb   from '../database/configDB';
import  usuarioRouter   from '../routes/usuario.route' ;
import  authRouter   from '../routes/auth.route' ;

class Server{

    public app:express.Application;
    public port: number | string;

    constructor(puerto: number | string ){
        this.app = express();
        this.port = puerto;
        this.config();
        this.routes();

    }

   config(){
        // inicializa Base de datos 
       
        const dbCnn = new configDb();
        dbCnn.dbConecction();
                 
           // settings para identificar el puerto del Server
        this.app.set('port', process.env.PORT || this.port  );

        // Middlewares

        this.app.use(morgan('dev'));
        this.app.use(cors( {origin:true, credentials:true}));
       
   }

   routes(){

         // create application/x-www-form-urlencoded parser
         this.app.use(bodyParser.urlencoded({ extended: true }));
         // create application/json parser
         this.app.use(bodyParser.json());

         // rutas api de usuarios
         this.app.use('/api/usuarios', usuarioRouter.router);
         this.app.use('/api/login', authRouter.router);

    };

    start(){

        this.app.listen( this.app.get('port'), ()=>{
            console.log('Server on port :', this.app.get('port'));    
            }) ;

    }

}

export default Server;