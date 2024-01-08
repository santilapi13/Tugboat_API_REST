import { diasService } from '../services/dias.service.js';
import DiaDTO from '../dao/dto/dia.dto.js';

async function getDias(req, res) {
    try {
        const dias = await diasService.getDias();
        res.sendOk(dias);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function getDiaByFecha(req, res) {
    const { fecha } = req.params;

    if (!fecha || !(fecha instanceof Date))
        res.sendBadRequest('Fecha inválida.');

    try {
        const dias = await diasService.getDias({ fecha });
        res.sendOk(dias[0]);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postDia(req, res) {
    const { fecha, tripulacion, feriado } = req.body;
    let dia;
    let result;

    try {
        dia = new DiaDTO({ fecha, tripulacion, feriado });
        await dia.validateReferences();
        result = await diasService.createDia(dia);
    } catch (error) {
        res.sendBadRequest(error.message);
    }

    res.sendCreated(result);
}

async function putDia(req, res) {
    // TODO: Implementar cambios en la tripulación o feriado de un día.
}

export default { getDias, getDiaByFecha, postDia, putDia };