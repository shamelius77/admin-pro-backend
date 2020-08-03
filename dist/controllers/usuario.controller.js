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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
// importar el modelo de usuarios
const usuario_model_1 = __importDefault(require("../database/models/usuario.model"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const [usuarios, total] = yield Promise.all([
        usuario_model_1.default.find({}, 'nombre email role google, img')
            .skip(desde)
            .limit(5),
        usuario_model_1.default.find().countDocuments()
    ]);
    res.status(200).json({
        ok: true,
        usuarios,
        total
    });
});
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const existEmail = yield usuario_model_1.default.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya existe'
            });
        }
        const usuario = new usuario_model_1.default(req.body);
        console.log(password);
        // Encriptar password 
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        // generar TOKEN
        const token = yield jwt_1.default(usuario.id);
        res.status(200).json({
            ok: true,
            usuario: usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error ...... revisar log'
        });
    }
});
const updUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: validar token
    const uid = req.params.id;
    try {
        const usuariosDB = yield usuario_model_1.default.findById(uid);
        // console.log(uid);
        if (!usuariosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese ID'
            });
        }
        // Actualizaciones
        const _a = req.body, { google, password, email } = _a, campos = __rest(_a, ["google", "password", "email"]);
        if (usuariosDB.email !== email) {
            const existeEmail = yield usuario_model_1.default.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email...'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = yield usuario_model_1.default.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar log'
        });
    }
});
const delUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    try {
        const usuariosDB = yield usuario_model_1.default.findById(uid);
        if (!usuariosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese ID'
            });
        }
        yield usuario_model_1.default.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            uid,
            msg: 'usuario eliminado'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error ...... revisar log'
        });
    }
});
exports.default = {
    getUsuarios,
    postUsuario,
    updUsuarios,
    delUsuario
};
