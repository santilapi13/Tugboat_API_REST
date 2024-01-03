import { maniobrasService } from '../services/maniobras.service.js';

async function getManiobras(req, res) {
    try {
        const maniobras = await maniobrasService.getManiobras();
        res.sendOk(maniobras);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function getManiobraByCode(req, res) {
    const { cod_maniobra } = req.params;

    try {
        const maniobra = await maniobrasService.getManiobras({ cod_maniobra });
        res.sendOk(maniobra);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postManiobra(req, res) {
    const { title } = req.body;

    try {
        const maniobra = await maniobrasService.createManiobra({ title });
        res.sendCreated(maniobra);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

export default { getManiobras, getManiobraByCode, postManiobra };