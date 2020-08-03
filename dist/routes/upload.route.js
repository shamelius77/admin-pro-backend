"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = __importDefault(require("../controllers/upload.controller"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class UploadsClass {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.put('/:tipo/:id', validar_jwt_1.default, upload_controller_1.default.putFileUpload);
        this.router.get('/:tipo/:foto', upload_controller_1.default.retornaImagen);
    }
}
;
const uploadsClass = new UploadsClass();
exports.default = uploadsClass;
