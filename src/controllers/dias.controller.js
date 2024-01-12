import { diasService } from '../services/dias.service.js';
import DiaDTO from '../dao/dto/dia.dto.js';

async function getDias(req, res) {
    try {
        const dias = await diasService.getDias();
        res.sendOk(dias);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function getDiaByFecha(req, res) {
    const { fecha } = req.params;

    if (!fecha || !(fecha instanceof Date))
        res.sendBadRequestError('Invalid fecha');

    try {
        const dias = await diasService.getDias({ fecha });
        res.sendOk(dias[0]);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function postDia(req, res) {
    const { fecha, tripulacion, feriado } = req.body;
    let dia;
    let result;

    try {
        dia = new DiaDTO({ fecha, tripulacion, feriado });   // TODO: Error: fecha should be a Date
        await dia.validateReferences();
    } catch (error) {
        res.sendBadRequestError(error.message);
    }

    try {
        result = await diasService.createDia(dia);
    } catch (error) {
        res.sendInternalServerError(error.message);
    }

    res.sendCreated(result);
}

async function putDia(req, res) {
    const fechaEsperada = req.params;
    let { tripulacion, feriado } = req.body;
    let dia;
    let result;

    try {
        const fecha = diasService.getDias({}, { sort: { 'fecha': -1 }, limit: 1 })[0].fecha; 
        if (fechaEsperada.getDay() !== fecha.getDay() || fechaEsperada.getMonth() !== fecha.getMonth() || fechaEsperada.getFullYear() !== fecha.getFullYear())
            res.sendBadRequestError(`Invalid fecha. Expected: ${fechaEsperada}. Last loaded in database: ${fecha}.`);

        dia = new DiaDTO({ fecha, tripulacion, feriado });
        await dia.validateReferences();
    } catch (error) {
        res.sendBadRequestError(error.message);
    }

    try {
        result = await diasService.updateDia(dia);
    } catch (error) {
        res.sendInternalServerError(error.message);
    }
}

export default { getDias, getDiaByFecha, postDia, putDia };