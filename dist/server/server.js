"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const configDB_1 = __importDefault(require("../database/configDB"));
const usuario_route_1 = __importDefault(require("../routes/usuario.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
class Server {
    constructor(puerto) {
        this.app = express_1.default();
        this.port = puerto;
        this.config();
        this.routes();
    }
    config() {
        // inicializa Base de datos 
        const dbCnn = new configDB_1.default();
        dbCnn.dbConecction();
        // settings para identificar el puerto del Server
        this.app.set('port', process.env.PORT || this.port);
        // Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({ origin: true, credentials: true }));
    }
    routes() {
        // create application/x-www-form-urlencoded parser
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        // create application/json parser
        this.app.use(body_parser_1.default.json());
        // rutas api de usuarios
        this.app.use('/api/usuarios', usuario_route_1.default.router);
        this.app.use('/api/login', auth_route_1.default.router);
    }
    ;
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port :', this.app.get('port'));
        });
    }
}
exports.default = Server;
