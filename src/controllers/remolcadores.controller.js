import { remolcadoresService } from '../services/remolcadores.service.js';

async function getRemolcadores(req, res) {
    try {
        const remolcadores = await remolcadoresService.getRemolcadores();
        res.sendOk(remolcadores);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function getRemolcadorByCode(req, res) {
    const { cod_remolcador } = req.params;

    try {
        const remolcador = await remolcadoresService.getRemolcadores({ cod_remolcador });
        res.sendOk(remolcador);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postRemolcador(req, res) {
    const { title } = req.body;

    try {
        const remolcador = await remolcadoresService.createRemolcador({ title });
        res.sendCreated(remolcador);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

export default { getRemolcadores, getRemolcadorByCode, postRemolcador };