"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const configDB_1 = __importDefault(require("../database/configDB"));
const usuario_route_1 = __importDefault(require("../routes/usuario.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const hospital_route_1 = __importDefault(require("../routes/hospital.route"));
const medico_route_1 = __importDefault(require("../routes/medico.route"));
const busqueda_route_1 = __importDefault(require("../routes/busqueda.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
class Server {
    constructor(puerto) {
        this.app = express_1.default();
        this.port = puerto;
        this.config();
        this.routes();
    }
    config() {
        const publicPath = path_1.default.resolve(__dirname, '../public');
        const dbCnn = new configDB_1.default();
        dbCnn.dbConecction();
        this.app.set('port', process.env.PORT || this.port);
        this.app.use(express_1.default.static(publicPath));
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        this.app.use(express_fileupload_1.default());
    }
    routes() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use('/api/usuarios', usuario_route_1.default.router);
        this.app.use('/api/login', auth_route_1.default.router);
        this.app.use('/api/hospitales', hospital_route_1.default.router);
        this.app.use('/api/medicos', medico_route_1.default.router);
        this.app.use('/api/todo', busqueda_route_1.default.router);
        this.app.use('/api/uploads', upload_route_1.default.router);
    }
    ;
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port :', this.app.get('port'));
        });
    }
}
exports.default = Server;
