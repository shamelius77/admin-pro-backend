"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busqueda_controller_1 = __importDefault(require("../controllers/busqueda.controller"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class BusquedasClass {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/:busqueda', validar_jwt_1.default, busqueda_controller_1.default.getBusquedas);
        this.router.get('/coleccion/:tabla/:busqueda', validar_jwt_1.default, busqueda_controller_1.default.getBusquedasColleccion);
    }
}
;
const busquedaClass = new BusquedasClass();
exports.default = busquedaClass;
