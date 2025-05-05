import { partesService } from '../services/partes.service.js';
import { remolcadoresService, buquesService, solicitantesService } from '../services/services.js';
import { diasService } from '../services/dias.service.js';
import ParteDTO from '../dao/dto/parte.dto.js';

function validateQueryParams(remolcador, buque, solicitante, confirmado, facturado) {
    if (remolcador) {
        remolcador = remolcadoresService.get({ cod_remolcador: remolcador });
        if (!remolcador) throw new Error("Remolcador not found.");
        remolcador = remolcador._id;
    }

    buque = buquesService.get({ cod_buque: buque });
    if (!buque) throw new Error("Buque not found.");
    buque = buque._id;

    solicitante = solicitantesService.get({ cod_solicitante: solicitante });
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
        req.logger.error(`Error fetching all dailys: ${error.message}`);
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
        req.logger.error(`Error posting new daily (${parte}): ${error.message}`);
        return res.sendInternalServerError(error.message);
    }

    res.sendCreated(result);
}

async function postPartesPendientes(req, res) {
    let { cod_remolcador, partes } = req.body;
    let result = [];
    let dia;

    for (const parte of partes) {
        let parteDTO = {
            remolcador: cod_remolcador,
            buque: parte.cod_buque,
            maniobra: parte.cod_maniobra,
            hora_inicio: parte.hora_inicio,
            hora_fin: parte.hora_fin,
            solicitante: parte.cod_solicitante,
            bandera: parte.cod_bandera,
            observaciones: parte.observaciones,
            practico: parte.practico,
            otra_embarcacion: parte.otra_embarcacion
        };

        try {
            parteDTO = new ParteDTO(parteDTO);
            await parteDTO.validatePropertiesValues();

            dia = await diasService.getDias({ fecha: parteDTO.hora_inicio, remolcador: cod_remolcador }, 1);
            dia = dia[0];

            if (!dia)
                throw new Error(`Cannot create a parte for a dia that doesn't exist (fecha: ${parteDTO.hora_inicio}, remolcador: ${parteDTO.remolcador}).`);
        } catch (error) {
            result.push({ creationStatus: "error", parte: parte, error: "bad request", message: error.message });
            continue;
        }

        try {
            const payload = await parteCreationTransaction(dia, parteDTO);
            result.push({ creationStatus: "success", parte: parte, payload});
        } catch (error) {
            result.push({ creationStatus: "error", parte: parte, error: "server internal error", message: error.message });
        }
    }

    res.sendOk(result);
}

async function putParte(req, res) {
    const { cod_parte } = req.params;
    let { cod_buque, cod_maniobra, cod_solicitante, cod_bandera } = req.body;
    let parte;
    let result;

    try {
        parte = await partesService.getPartes({ cod_parte });
        parte = parte[0];
        if (!parte) throw new Error(`Parte with code ${cod_parte} not found.`);

        let { remolcador, hora_inicio, hora_fin, observaciones, practico, otra_embarcacion } = parte;

        if (!cod_buque)
            cod_buque = parte.buque.cod_buque;
        if (!cod_maniobra)
            cod_maniobra = parte.maniobra.cod_maniobra;
        if (!cod_solicitante)
            cod_solicitante = parte.solicitante.cod_solicitante;
        if (!cod_bandera)
            cod_bandera = parte.bandera.cod_bandera;

        parte = new ParteDTO({ remolcador: remolcador.cod_remolcador, buque: cod_buque, maniobra: cod_maniobra, hora_inicio, hora_fin, solicitante: cod_solicitante, bandera: cod_bandera, observaciones, practico, otra_embarcacion });
        await parte.validatePropertiesValues();
        
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    try {
        result = await partesService.updateParte(cod_parte, parte);
    } catch (error) {
        req.logger.error(`Error updating daily with code ${cod_parte}: ${error.message}`);
        return res.sendInternalServerError(error.message);
    }

    res.sendOk(result);
}

async function confirmarParte(req, res) {
    const { cod_parte } = req.params;
    let parte;

    try {
        parte = await partesService.getPartes({ cod_parte });
        parte = parte[0];
        if (!parte) throw new Error(`Parte with code ${cod_parte} not found.`);

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
        parte = await partesService.getPartes({ cod_parte });
        parte = parte[0];
        if (!parte) throw new Error(`Parte with code ${cod_parte} not found.`);

        parte = await partesService.updateParte(cod_parte, { facturado: !parte.facturado });
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    res.sendOk(parte);
}
export default { getPartes, postParte, putParte, confirmarParte, facturarParte, postPartesPendientes };