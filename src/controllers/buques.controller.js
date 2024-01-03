import { buquesService } from '../services/buques.service.js';

async function getBuques(req, res) {
    try {
        const buques = await buquesService.getBuques();
        res.sendOk(buques);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function getBuqueByCode(req, res) {
    const { cod_buque } = req.params;

    try {
        const buque = await buquesService.getBuques({ cod_buque });
        res.sendOk(buque);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postBuque(req, res) {
    const { title } = req.body;

    try {
        const buque = await buquesService.createBuque({ title });
        res.sendCreated(buque);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

export default { getBuques, getBuqueByCode, postBuque };