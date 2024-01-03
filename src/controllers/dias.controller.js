import { diasService } from '../services/dias.service.js';

async function getDias(req, res) {
    try {
        const dias = await diasService.getDias();
        res.sendOk(dias);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postDia(req, res) {
    // TODO: Implementar la creacion de un dia.
}

export default { getDias, postDia };