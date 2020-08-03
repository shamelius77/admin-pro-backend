import fs from 'fs';

// importar los modelos
import Usuario from '../database/models/usuario.model'
import Medico from '../database/models/medico.model'
import Hospital from '../database/models/hospital.model'


const actualizarImagen = async (tipo:string, id:string, nombreArchivo:string) =>{
 
    let pathViejo:string = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if (!medico){
                console.log('No exsite medico con ese ID');
                return false;
            }

            pathViejo = `./src/uploads/${tipo}/${medico.img}`;
            console.log( fs.existsSync(pathViejo) );
            console.log(pathViejo);


            if (fs.existsSync(pathViejo)){
                // borrar la imagen anterior
                fs.unlinkSync(pathViejo)
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
            break;
    
        case 'hospitales':
            const hospital = await Hospital.findById(id)
            if (!hospital){
                console.log('No exsite hospital con ese ID');
                return false;
            }

            pathViejo = `./src/uploads/${tipo}/${hospital.img}`;
            if (fs.existsSync(pathViejo)){
                // borrar la imagen anterior
                fs.unlinkSync(pathViejo)
            }

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
            
            break;
    
        case 'usuarios':
            const usuario = await Usuario.findById(id)
            if (!usuario){
                console.log('No exsite usuario con ese ID');
                return false;
            }

            pathViejo = `./src/uploads/${tipo}/${usuario.img}`;
            if (fs.existsSync(pathViejo)){
                // borrar la imagen anterior
                fs.unlinkSync(pathViejo)
            }

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            
            break;
    
        default:
            break;
    }


}

export default actualizarImagen