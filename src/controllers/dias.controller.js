import { diasService } from '../services/dias.service.js';
import DiaDTO from '../dao/dto/dia.dto.js';

async function getDias(req, res) {
    let { fecha, cod_remolcador, limit } = req.query;
    let dias;

    if (fecha)
        fecha = new Date(fecha);

    const query = { fecha, remolcador: cod_remolcador };

    try {
        dias = await diasService.getDias(query, limit);
        res.sendOk(dias);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function postDia(req, res) {
    const { fecha, tripulacion, feriado } = req.body;
    let dia;
    let result;

    try {
        dia = new DiaDTO({ fecha, tripulacion, feriado });
        await dia.validateReferences();
        await dia.validateUnique();
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    try {
        result = await diasService.createDia(dia);
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }

    res.sendCreated(result);
}

async function putDia(req, res) {
    let { fecha } = req.params;
    let { tripulacion, feriado } = req.body;
    let dia;
    let result;

    if (!fecha)
        return res.sendBadRequestError('Fecha is missing');

    fecha = new Date(fecha); 

    try {
        /*
        const fecha = await diasService.getDias({}, { sort: { 'fecha': -1 }, limit: 1 })[0].fecha; 
        if (fechaEsperada.getDay() !== fecha.getDay() || fechaEsperada.getMonth() !== fecha.getMonth() || fechaEsperada.getFullYear() !== fecha.getFullYear())
            return res.sendBadRequestError(`Invalid fecha. Expected: ${fechaEsperada}. Last loaded in database: ${fecha}.`);
        */

        dia = new DiaDTO({ fecha, tripulacion, feriado });
        await dia.validateReferences();
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    try {
        result = await diasService.updateDia(dia);
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }

    res.sendOk(result);
}

export default { getDias, postDia, putDia };