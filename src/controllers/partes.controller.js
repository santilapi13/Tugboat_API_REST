import { partesService } from '../services/partes.service.js';
import { remolcadoresService } from '../services/remolcadores.service.js';
import { buquesService } from '../services/buques.service.js';
import { solicitantesService } from '../services/solicitantes.service.js';
import { diasService } from '../services/dias.service.js';
import ParteDTO from '../dao/dto/parte.dto.js';

function validateQueryParams(remolcador, buque, solicitante, confirmado, facturado) {
    remolcador = remolcadoresService.getRemolcador({ cod_remolcador: remolcador });
    if (!remolcador) throw new Error("Remolcador not found.");
    remolcador = remolcador._id;

    buque = buquesService.getBuque({ cod_buque: buque });
    if (!buque) throw new Error("Buque not found.");
    buque = buque._id;

    solicitante = solicitantesService.getSolicitante({ cod_solicitante: solicitante });
    if (!solicitante) throw new Error("Solicitante not found.");
    solicitante = solicitante._id;

    if (confirmado !== undefined && !confirmado.match(/^(true|false)$/))
        throw new Error("Invalid confirmado value.");
    if (facturado !== undefined && !facturado.match(/^(true|false)$/))
        throw new Error("Invalid facturado value.");

    return { remolcador, buque, solicitante };
}

async function getPartes(req, res) {
    let { remolcador, buque, solicitante, confirmado, facturado } = req.query;

    try {
        const validatedParams = validateQueryParams(remolcador, buque, solicitante, confirmado, facturado);
        remolcador = validatedParams.remolcador;
        buque = validatedParams.buque;
        solicitante = validatedParams.solicitante;
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    try {
        const partes = await partesService.getPartes({ remolcador, buque, solicitante, confirmado, facturado });
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }

    res.sendOk(partes);
}

async function postParte(req, res) {
    let { remolcador, buque, maniobra, hora_inicio, hora_fin, solicitante, bandera, observaciones, practico, otra_embarcacion } = req.body;
    let parte;
    let result;

    try {
        parte = new ParteDTO({ remolcador, buque, maniobra, hora_inicio, hora_fin, solicitante, bandera, observaciones, practico, otra_embarcacion });
        await parte.validatePropertiesValues();
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    try {
        let dia = await diasService.getDias({ sort: { fecha: 'desc' } });
        dia = dia[0];

        if (dia.fecha.getDay() !== hora_inicio.getDay() ||  dia.fecha.getMonth() !== hora_inicio.getMonth() || dia.fecha.getFullYear() !== hora_inicio.getFullYear())
            throw new Error("Cannot create a parte for a dia that doesn't exist.");

        result = await partesService.createParte(parte);
        await diasService.addParteToDia(dia, result.cod_parte);
    } catch (error) {
        // TODO: Implementar función de rollback en caso de error ya que hay 2 operaciones que deben ser atómicas.
        return res.sendInternalServerError(error.message);
    }

    res.sendCreated(result);
}

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