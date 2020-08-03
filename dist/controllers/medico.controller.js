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
// importar el modelo de medicos
const medico_model_1 = __importDefault(require("../database/models/medico.model"));
const getMedicos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicos = yield medico_model_1.default.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre');
        res.status(200).json({
            ok: true,
            medicos,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hablar con el administrador'
        });
    }
});
const postMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    const hospitalID = req.body.hospitalID;
    const medico = new medico_model_1.default(Object.assign({ hospital: hospitalID, usuario: uid }, req.body));
    try {
        const medicoGrabado = yield medico.save();
        res.status(200).json({
            ok: true,
            medico: medicoGrabado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con el administrador'
        });
    }
});
const putMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const Medicos = await Hospital.find({} )
    res.status(200).json({
        ok: true,
        msg: 'put  Medicos',
    });
});
const deleteMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const Medicos = await Hospital.find({} )
    res.status(200).json({
        ok: true,
        msg: 'delete Medicos',
    });
});
exports.default = {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico
};
