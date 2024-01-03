import { capitanesService } from '../services/capitanes.service.js';

async function getCapitanes(req, res) {
    try {
        const capitanes = await capitanesService.getCapitanes();
        res.sendOk(capitanes);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function getCapitanByCode(req, res) {
    const { cod_capitan } = req.params;

    try {
        const capitan = await capitanesService.getCapitanes({ cod_capitan });
        res.sendOk(capitan);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

async function postCapitan(req, res) {
    const { first_name, last_name } = req.body;

    try {
        const capitan = await capitanesService.createCapitan({ first_name, last_name });
        res.sendCreated(capitan);
    } catch (error) {
        res.sendBadRequest(error.message);
    }
}

export default { getCapitanes, getCapitanByCode, postCapitan };