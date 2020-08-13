"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class AuthClass {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/', [
            express_validator_1.check('email', 'El email es obligatorio').isEmail(),
            express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
            validar_campos_1.default
        ], auth_controller_1.default.postAuth);
        this.router.get('/renew', validar_jwt_1.default, auth_controller_1.default.postAuth);
        this.router.post('/google', [
            express_validator_1.check('token', 'El token de google es obligatorio').not().isEmpty(),
            validar_campos_1.default
        ], auth_controller_1.default.googleSignIn);
        this.router.get('/renew', validar_jwt_1.default, auth_controller_1.default.postAuth);
    }
}
;
const authClass = new AuthClass();
exports.default = authClass;
