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
// importar el modelo de usuarios
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
        // buscar si no existe hospital
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
    // const hospitales = await Hospital.find({} )
    res.status(200).json({
        ok: true,
        msg: 'put  hospitales',
    });
});
const deleteHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const hospitales = await Hospital.find({} )
    res.status(200).json({
        ok: true,
        msg: 'delete hospitales',
    });
});
// const postHospital = async (req:Request, res:Response, )=>{
//     const { nombre, img, usuario } = req.body;
//     try{  
//         const existNomb = await Hospital.findOne({nombre});
//         if (existNomb) {
//                 return res.status(400).json({
//                     ok: false,
//                     msg: 'el hospital ya existe'
//                 })
//         }
//         const hospital = new Hospital(req.body);
//         await hospital.save();
//         // generar TOKEN
//         // const token = await generarJwt(usuario.id)
//         res.status(200).json({
//             ok: true,
//             hospital
//         })     
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({
//                 ok: false,
//                 msg: 'Error ...... revisar log'
//         })
//     }
// };
exports.default = {
    getHospitales,
    postHospital,
    putHospital,
    deleteHospital
};
