
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload  from 'express-fileupload';
import path from 'path';


import  configDb   from '../database/configDB';
// rutas
import usuarioRouter    from '../routes/usuario.route' ;
import authRouter       from '../routes/auth.route' ;
import hospitalRouter   from '../routes/hospital.route';
import medicoRouter     from '../routes/medico.route';
import busquedaRouter   from '../routes/busqueda.route';
import uploadRouter     from '../routes/upload.route';



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

       const publicPath = path.resolve(__dirname, '../public');

        // inicializa Base de datos 
       
        const dbCnn = new configDb();
        dbCnn.dbConecction();
                 
           // settings para identificar el puerto del Server
        this.app.set('port', process.env.PORT || this.port  );

        // Middlewares
        this.app.use(express.static(publicPath));

        this.app.use(morgan('dev'));
        this.app.use(cors( {origin:true, credentials:true}));

        this.app.use(fileUpload());

      
   }

   routes(){

         // create application/x-www-form-urlencoded parser
         this.app.use(bodyParser.urlencoded({ extended: true }));
         // create application/json parser
         this.app.use(bodyParser.json());

         // rutas api de usuarios y login
         this.app.use('/api/usuarios', usuarioRouter.router);
         this.app.use('/api/login', authRouter.router);
         
         // rutas api hospitales
         this.app.use('/api/hospitales', hospitalRouter.router);
         // rutas api medicos
         this.app.use('/api/medicos', medicoRouter.router);

         // Busquedas
         this.app.use('/api/todo', busquedaRouter.router);
         
         // Uploads
         this.app.use('/api/uploads', uploadRouter.router );

    };

    start(){

        this.app.listen( this.app.get('port'), ()=>{
            console.log('Server on port :', this.app.get('port'));    
            }) ;


    }

}

export default Server;