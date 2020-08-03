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
const fs_1 = __importDefault(require("fs"));
// importar los modelos
const usuario_model_1 = __importDefault(require("../database/models/usuario.model"));
const medico_model_1 = __importDefault(require("../database/models/medico.model"));
const hospital_model_1 = __importDefault(require("../database/models/hospital.model"));
const actualizarImagen = (tipo, id, nombreArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = yield medico_model_1.default.findById(id);
            if (!medico) {
                console.log('No exsite medico con ese ID');
                return false;
            }
            pathViejo = `./src/uploads/${tipo}/${medico.img}`;
            console.log(fs_1.default.existsSync(pathViejo));
            console.log(pathViejo);
            if (fs_1.default.existsSync(pathViejo)) {
                // borrar la imagen anterior
                fs_1.default.unlinkSync(pathViejo);
            }
            medico.img = nombreArchivo;
            yield medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = yield hospital_model_1.default.findById(id);
            if (!hospital) {
                console.log('No exsite hospital con ese ID');
                return false;
            }
            pathViejo = `./src/uploads/${tipo}/${hospital.img}`;
            if (fs_1.default.existsSync(pathViejo)) {
                // borrar la imagen anterior
                fs_1.default.unlinkSync(pathViejo);
            }
            hospital.img = nombreArchivo;
            yield hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = yield usuario_model_1.default.findById(id);
            if (!usuario) {
                console.log('No exsite usuario con ese ID');
                return false;
            }
            pathViejo = `./src/uploads/${tipo}/${usuario.img}`;
            if (fs_1.default.existsSync(pathViejo)) {
                // borrar la imagen anterior
                fs_1.default.unlinkSync(pathViejo);
            }
            usuario.img = nombreArchivo;
            yield usuario.save();
            return true;
            break;
        default:
            break;
    }
});
exports.default = actualizarImagen;
