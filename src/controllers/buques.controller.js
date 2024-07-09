import { buquesService } from '../services/buques.service.js';

async function getBuques(req, res) {
    try {
        const buques = await buquesService.getBuques();
        res.sendOk(buques);
    } catch (error) {
        req.logger.error(`Error fetching all ships: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getBuqueByCode(req, res) {
    const { cod_buque } = req.params;
    let buque;

    try {
        buque = await buquesService.getBuques({ cod_buque });

        if (!buque)
            return res.sendBadRequestError(`Ship with code ${cod_buque} not found.`);

        res.sendOk(buque);
    } catch (error) {
        req.logger.error(`Error fetching ship with code ${cod_buque}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postBuque(req, res) {
    const { title } = req.body;

    try {
        const buque = await buquesService.createBuque({ title });
        res.sendCreated(buque);
    } catch (error) {
        req.logger.error(`Error creating ship named ${title}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getBuques, getBuqueByCode, postBuque };