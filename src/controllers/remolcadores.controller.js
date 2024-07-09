import { remolcadoresService } from '../services/remolcadores.service.js';

async function getRemolcadores(req, res) {
    try {
        const remolcadores = await remolcadoresService.getRemolcadores();
        res.sendOk(remolcadores);
    } catch (error) {
        req.logger.error(`Error fetching all tugboats: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getRemolcadorByCode(req, res) {
    const { cod_remolcador } = req.params;
    let remolcador;

    try {
        remolcador = await remolcadoresService.getRemolcadores({ cod_remolcador });

        if (!remolcador) {
            return res.sendBadRequestError(`Tugboat with code ${cod_remolcador} not found.`);
        }

        res.sendOk(remolcador);
    } catch (error) {
        req.logger.error(`Error fetching tugboat with code ${cod_remolcador}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postRemolcador(req, res) {
    const { title } = req.body;

    try {
        const remolcador = await remolcadoresService.createRemolcador({ title });
        res.sendCreated(remolcador);
    } catch (error) {
        req.logger.error(`Error creating tugboat named ${title}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getRemolcadores, getRemolcadorByCode, postRemolcador };