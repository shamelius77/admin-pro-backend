
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Database {

    dbCnn:any = process.env.DB_CNN

    constructor(){
    }

   async dbConecction(){
    try {
        
        await mongoose.connect(this.dbCnn, { 
             useNewUrlParser: true, 
             useUnifiedTopology: true,
             useCreateIndex: true
         });

         console.log('database online');

    }
    catch (error){

        console.log(error);
        throw new Error('error al iniciar mongoDb ');

    }

    }
}

export default Database ;