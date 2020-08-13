"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJwt = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion...'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};
exports.default = validarJwt;
