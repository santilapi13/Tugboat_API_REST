import { remolcadorModel } from '../model/remolcador.model.js'
import { buqueModel } from '../model/buque.model.js'
import { maniobraModel } from '../model/maniobra.model.js';
import { solicitanteModel } from '../model/solicitante.model.js';
import { banderaModel } from '../model/bandera.model.js';

async function validateExistence(id, model) {
    if (!mongoose.Types.ObjectId.isValid(id))
        return {
            error: true,
            msg: "Invalid id format"
        };
    
    const payload = await model.findById(id);
    if (!payload)
        return {
            error: true,
            msg: "id not found"
        };
    
    return {
        error: false,
        msg: "",
        payload
    }
}

async function parteCodesToIds(parte) {
    let remolcador = await remolcadorModel.find({ cod_remolcador: parte.remolcador });
    if (!remolcador[0]) throw new Error(`Remolcador with code ${parte.remolcador} not found.`);
    parte.remolcador = remolcador[0]._id;

    let buque = await buqueModel.find({ cod_buque: parte.buque });
    if (!buque[0]) throw new Error(`Buque with code ${parte.buque} not found.`);
    parte.buque = buque[0]._id;

    let solicitante = await solicitanteModel.find({ cod_solicitante: parte.solicitante });
    if (!solicitante[0]) throw new Error(`Solicitante with code ${parte.solicitante} not found.`);
    parte.solicitante = solicitante[0]._id;

    if (!parte.maniobra || !parte.bandera)
        return parte;

    let maniobra = await maniobraModel.find({ cod_maniobra: parte.maniobra });
    if (!maniobra[0]) throw new Error(`Maniobra with code ${parte.maniobra} not found.`);
    parte.maniobra = maniobra[0]._id;

    let bandera = await banderaModel.find({ cod_bandera: parte.bandera });
    if (!bandera[0]) throw new Error(`Bandera with code ${parte.bandera} not found.`);
    parte.bandera = bandera[0]._id;

    return parte;
}

export default { validateExistence, parteCodesToIds };