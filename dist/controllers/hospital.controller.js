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
const mongoose_1 = __importDefault(require("mongoose"));
const hospital_model_1 = __importDefault(require("../database/models/hospital.model"));
const getHospitales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitales = yield hospital_model_1.default.find()
        .populate('usuario', 'nombre img');
    res.status(200).json({
        ok: true,
        hospitales,
    });
});
const postHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    const hospital = new hospital_model_1.default(Object.assign({ usuario: uid }, req.body));
    try {
        const existeHospital = yield hospital_model_1.default.findOne({ nombre: req.body.nombre });
        if (existeHospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe el Hospital con ese nombre'
            });
        }
        const hospitalGrabado = yield hospital.save();
        res.status(200).json({
            ok: true,
            hospitalGrabado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        });
    }
});
const putHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const uid = req.body.uid;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error, el ID proporcionado no es valido'
            });
        }
        const hospitalDB = yield hospital_model_1.default.findById({ _id: mongoose_1.default.Types.ObjectId(id) });
        if (!hospitalDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado',
                id
            });
        }
        const cambiosHospital = Object.assign(Object.assign({}, req.body), { usuario: uid });
        const hospitalActualizado = yield hospital_model_1.default.findByIdAndUpdate(id, cambiosHospital, { new: true });
        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        });
    }
});
const deleteHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error, el ID proporcionado no es valido'
            });
        }
        const hospitalDB = yield hospital_model_1.default.findById({ _id: mongoose_1.default.Types.ObjectId(id) });
        if (!hospitalDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado',
                id
            });
        }
        const hospitalEliminado = yield hospital_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: 'hospital eleiminado',
            hospital: hospitalEliminado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error.- hablar con el Administrador',
        });
    }
});
exports.default = {
    getHospitales,
    postHospital,
    putHospital,
    deleteHospital
};
