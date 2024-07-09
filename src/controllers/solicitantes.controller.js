import { solicitantesService } from '../services/solicitantes.service.js';

async function getSolicitantes(req, res) {
    try {
        const solicitantes = await solicitantesService.getSolicitantes();
        res.sendOk(solicitantes);
    } catch (error) {
        req.logger.error(`Error fetching all clients: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getSolicitanteByCode(req, res) {
    const { cod_solicitante } = req.params;
    let solicitante;

    try {
        solicitante = await solicitantesService.getSolicitantes({ cod_solicitante });

        if (!solicitante)
            return res.sendBadRequestError(`Client with code ${cod_solicitante} not found.`);

        res.sendOk(solicitante);
    } catch (error) {
        req.logger.error(`Error fetching client with code ${cod_solicitante}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postSolicitante(req, res) {
    const { title } = req.body;

    try {
        const solicitante = await solicitantesService.createSolicitante({ title });
        res.sendCreated(solicitante);
    } catch (error) {
        req.logger.error(`Error creating client named ${title}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getSolicitantes, getSolicitanteByCode, postSolicitante };