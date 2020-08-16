"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = __importDefault(require("../database/models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const google_verify_1 = __importDefault(require("../helpers/google-verify"));
const postAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const usuarioDB = yield usuario_model_1.default.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido'
            });
        }
        ;
        const validPass = bcryptjs_1.default.compareSync(password, usuarioDB.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'password no valido'
            });
        }
        const token = yield jwt_1.default(usuarioDB.id);
        res.status(200).json({
            ok: true,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado.......ver log'
        });
    }
});
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = yield google_verify_1.default(googleToken);
        const usuarioDB = yield usuario_model_1.default.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new usuario_model_1.default({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            });
        }
        else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        yield usuario.save();
        const token = yield jwt_1.default(usuario.id);
        res.status(200).json({
            ok: true,
            msg: 'Google SignIn',
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado en Google SignIn.....ver log'
        });
    }
});
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    try {
        const token = yield jwt_1.default(uid);
        res.json({
            ok: true,
            uid
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado del renewToken.......ver log'
        });
    }
});
exports.default = {
    postAuth,
    googleSignIn,
    renewToken
};
