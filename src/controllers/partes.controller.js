import { partesService } from '../services/partes.service.js';
import { remolcadoresService } from '../services/remolcadores.service.js';
import { buquesService } from '../services/buques.service.js';
import { solicitantesService } from '../services/solicitantes.service.js';
import { diasService } from '../services/dias.service.js';
import ParteDTO from '../dao/dto/parte.dto.js';

function validateQueryParams(remolcador, buque, solicitante, confirmado, facturado) {
    if (remolcador) {
        remolcador = remolcadoresService.getRemolcadores({ cod_remolcador: remolcador });
        if (!remolcador) throw new Error("Remolcador not found.");
        remolcador = remolcador._id;
    }

    buque = buquesService.getBuques({ cod_buque: buque });
    if (!buque) throw new Error("Buque not found.");
    buque = buque._id;

    solicitante = solicitantesService.getSolicitantes({ cod_solicitante: solicitante });
    if (!solicitante) throw new Error("Solicitante not found.");
    solicitante = solicitante._id;

    

    return { remolcador, buque, solicitante };
}

async function getPartes(req, res) {
    let { cod_remolcador, cod_buque, cod_solicitante, confirmado, facturado } = req.query;

    try {
        if (confirmado !== undefined && !confirmado.match(/^(true|false)$/)) throw new Error("Invalid confirmado value.");
        if (facturado !== undefined && !facturado.match(/^(true|false)$/)) throw new Error("Invalid facturado value.");
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    let partes;
    try {
        partes = await partesService.getPartes({ cod_remolcador, cod_buque, cod_solicitante, confirmado, facturado });
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }

    res.sendOk(partes);
}

async function parteCreationTransaction(dia, parte) {
    let result;

    try {
        result = await partesService.createParte(parte);
    } catch (error) {
        throw new Error("Cannot create parte: " + error.message);
    }
    
    try {
        await diasService.addParteToDia(dia, result.cod_parte);
    } catch (error) {
        await partesService.deleteParte(result.cod_parte);
        throw new Error("Cannot add parte to dia: " + error.message);
    }
    
    return result;
}

async function postParte(req, res) {
    let { cod_remolcador, cod_buque, cod_maniobra, hora_inicio, hora_fin, cod_solicitante, cod_bandera, observaciones, practico, otra_embarcacion } = req.body;
    let parte;
    let result;

    try {
        parte = new ParteDTO({ remolcador: cod_remolcador, buque: cod_buque, maniobra: cod_maniobra, hora_inicio, hora_fin, solicitante: cod_solicitante, bandera: cod_bandera, observaciones, practico, otra_embarcacion });
        await parte.validatePropertiesValues();
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    try {
        let dia = await diasService.getDias({ fecha: parte.hora_inicio, remolcador: cod_remolcador }, 1);
        dia = dia[0];

        if (!dia)
            throw new Error(`Cannot create a parte for a dia that doesn't exist (fecha: ${parte.hora_inicio}, remolcador: ${parte.remolcador}).`);

        result = await parteCreationTransaction(dia, parte);
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }

    res.sendCreated(result);
}

// TODO: postPartes que reciba un array de partes pendientes

async function putParte(req, res) {
    const { cod_parte } = req.params;
    let { remolcador, buque, maniobra, solicitante, bandera } = req.body;
    let parte;
    let result;

    try {
        parte = await partesService.getParteByCode(cod_parte);
        if (!parte) throw new Error("Parte not found.");

        let { hora_inicio, hora_fin, observaciones, practico, otra_embarcacion } = parte;

        if (!remolcador)
            remolcador = parte.remolcador;
        if (!buque)
            buque = parte.buque;
        if (!maniobra)
            maniobra = parte.maniobra;
        if (!solicitante)
            solicitante = parte.solicitante;
        if (!bandera)
            bandera = parte.bandera;

        parte = new ParteDTO({ remolcador, buque, maniobra, hora_inicio, hora_fin, solicitante, bandera, observaciones, practico, otra_embarcacion });
        await parte.validatePropertiesValues();
        
        result = await partesService.updateParte(cod_parte, parte);
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    res.sendOk(result);
}

async function confirmarParte(req, res) {
    const { cod_parte } = req.params;
    let parte;

    try {
        parte = await partesService.getParteByCode(cod_parte);
        if (!parte) throw new Error("Parte not found.");

        parte = await partesService.updateParte(cod_parte, { confirmado: !parte.confirmado });
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    res.sendOk(parte);
}

async function facturarParte(req, res) {
    const { cod_parte } = req.params;
    let parte;

    try {
        parte = await partesService.getParteByCode(cod_parte);
        if (!parte) throw new Error("Parte not found.");

        parte = await partesService.updateParte(cod_parte, { facturado: !parte.facturado });
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    res.sendOk(parte);
}
export default { getPartes, postParte, putParte, confirmarParte, facturarParte };