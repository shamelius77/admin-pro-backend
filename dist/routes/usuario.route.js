"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class UsuariosClass {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', validar_jwt_1.default, usuario_controller_1.default.getUsuarios);
        this.router.post('/', [
            express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
            express_validator_1.check('email', 'El email es obligatorio').isEmail()
        ], validar_campos_1.default, usuario_controller_1.default.postUsuario);
        this.router.put('/:id', validar_jwt_1.default, [
            express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            express_validator_1.check('email', 'El email es obligatorio').isEmail(),
            express_validator_1.check('role', 'El role es obligatorio').not().isEmpty(),
        ], validar_campos_1.default, usuario_controller_1.default.updUsuarios);
        this.router.delete('/:id', validar_jwt_1.default, usuario_controller_1.default.delUsuario);
    }
}
;
const usuarioClass = new UsuariosClass();
exports.default = usuarioClass;
