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

async function addParte(req, res) {
    // TODO: Implementar agregado de un nuevo parte al día actual.
}

export default { getDias, postDia, putDia, addParte };