import  Server  from './server/server';
import dotenv from 'dotenv';

dotenv.config();

const puerto:any  = process.env.PORT ;
const server = new Server(puerto);
server.start();

