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
const medico_model_1 = __importDefault(require("../database/models/medico.model"));
const hospital_model_1 = __importDefault(require("../database/models/hospital.model"));
const getBusquedas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const [usaurios, medicos, hospitales] = yield Promise.all([
        usuario_model_1.default.find({ nombre: regex }),
        medico_model_1.default.find({ nombre: regex }),
        hospital_model_1.default.find({ nombre: regex })
    ]);
    res.status(200).json({
        ok: true,
        usaurios,
        medicos,
        hospitales
    });
});
const getBusquedasColleccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch (tabla) {
        case 'medicos':
            data = yield medico_model_1.default.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = yield hospital_model_1.default.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = yield usuario_model_1.default.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msk: 'La tabla tienen que ser Usuarios/Medicos/Hospitales',
            });
    }
    res.status(200).json({
        ok: true,
        resultados: data,
    });
});
exports.default = {
    getBusquedas,
    getBusquedasColleccion
};
