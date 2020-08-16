"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const hospital_controller_1 = __importDefault(require("../controllers/hospital.controller"));
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class HospitalesClass {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', validar_jwt_1.default, hospital_controller_1.default.getHospitales);
        this.router.post('/', [
            validar_jwt_1.default,
            express_validator_1.check('nombre', 'el nombre de hospital es obligatorio').not().isEmpty(),
            validar_campos_1.default
        ], hospital_controller_1.default.postHospital);
        this.router.put('/:id', [
            validar_jwt_1.default,
            express_validator_1.check('nombre', 'el nombre de hospital es obligatorio').not().isEmpty(),
            validar_campos_1.default
        ], hospital_controller_1.default.putHospital);
        this.router.delete('/:id', validar_jwt_1.default, hospital_controller_1.default.deleteHospital);
    }
}
;
const hospitalesClass = new HospitalesClass();
exports.default = hospitalesClass;
