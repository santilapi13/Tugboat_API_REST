import { partesService } from '../services/partes.service.js';
import { diasService } from '../services/dias.service.js';
import ParteDTO from '../dao/dto/parte.dto.js';

async function getPartes(req, res) {
    try {
        const partes = await partesService.getPartes();
        return res.sendOk(partes);
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }
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