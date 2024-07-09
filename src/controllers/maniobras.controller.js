import { maniobrasService } from '../services/maniobras.service.js';

async function getManiobras(req, res) {
    try {
        const maniobras = await maniobrasService.getManiobras();
        res.sendOk(maniobras);
    } catch (error) {
        req.logger.error(`Error fetching all maneuvers: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getManiobraByCode(req, res) {
    const { cod_maniobra } = req.params;
    let maniobra;

    try {
        maniobra = await maniobrasService.getManiobras({ cod_maniobra });

        if (!maniobra)
            return res.sendBadRequestError(`Maneuver with code ${cod_maniobra} not found.`);

        res.sendOk(maniobra);
    } catch (error) {
        req.logger.error(`Error fetching maneuver with code ${cod_maniobra}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postManiobra(req, res) {
    const { title } = req.body;

    try {
        const maniobra = await maniobrasService.createManiobra({ title });
        res.sendCreated(maniobra);
    } catch (error) {
        req.logger.error(`Error creating maneuver named ${title}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getManiobras, getManiobraByCode, postManiobra };