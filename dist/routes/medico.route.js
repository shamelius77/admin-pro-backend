"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const medico_controller_1 = __importDefault(require("../controllers/medico.controller"));
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class MedicosClass {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', medico_controller_1.default.getMedicos);
        this.router.post('/', [
            validar_jwt_1.default,
            express_validator_1.check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
            express_validator_1.check('hospital', 'El hospital debe ser un ID valido').isMongoId(),
            validar_campos_1.default
        ], medico_controller_1.default.postMedico);
        this.router.put('/:id', [
            validar_jwt_1.default,
            express_validator_1.check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
            express_validator_1.check('hospital', 'El hospital debe ser un ID valido').isMongoId(),
            validar_campos_1.default
        ], medico_controller_1.default.putMedico);
        this.router.delete('/:id', validar_jwt_1.default, medico_controller_1.default.deleteMedico);
    }
}
;
const medicosClass = new MedicosClass();
exports.default = medicosClass;
