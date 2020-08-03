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
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// importar de helpers
const actualizar_img_1 = __importDefault(require("../helpers/actualizar-img"));
const putFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'el tipo no es medico, ni usuario , ni hospital'
        });
    }
    // validar que si exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos para hacer uploads'
        });
    }
    /// Procesar la imagen......
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // archivo.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }
    // Generar nombre de archivo
    const nombreArchivo = `${uuid_1.v4()}.${extensionArchivo}`;
    // Definir el Path donde se guarda la imagen
    const path = `./src/uploads/${tipo}/${nombreArchivo}`;
    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
        }
        // Actualizar en la base de datos
        actualizar_img_1.default(tipo, id, nombreArchivo);
        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
});
const retornaImagen = (req, res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path_1.default.join(__dirname, `../uploads/${tipo}/${foto}`);
    // validar si existe el path
    if (fs_1.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        const pathImg = path_1.default.join(__dirname, `../uploads/imagenes/no-img.jpg`);
        res.sendFile(pathImg);
    }
};
exports.default = {
    putFileUpload,
    retornaImagen
};
