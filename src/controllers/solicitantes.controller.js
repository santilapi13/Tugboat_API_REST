import { solicitantesService } from '../services/solicitantes.service.js';

async function getSolicitantes(req, res) {
    try {
        const solicitantes = await solicitantesService.getSolicitantes();
        res.sendOk(solicitantes);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function getSolicitanteByCode(req, res) {
    const { cod_solicitante } = req.params;

    try {
        const solicitante = await solicitantesService.getSolicitantes({ cod_solicitante });
        res.sendOk(solicitante);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postSolicitante(req, res) {
    const { title } = req.body;

    try {
        const solicitante = await solicitantesService.createSolicitante({ title });
        res.sendCreated(solicitante);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

export default { getSolicitantes, getSolicitanteByCode, postSolicitante };