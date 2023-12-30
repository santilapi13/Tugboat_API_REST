import { partesService } from '../services/partes.service.js';

async function getPartes(req, res) {
    try {
        const partes = await partesService.getPartes();
        return res.sendOk(partes);
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }
}

export default { getPartes };