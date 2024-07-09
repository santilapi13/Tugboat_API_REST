import { capitanesService } from '../services/capitanes.service.js';

async function getCapitanes(req, res) {
    try {
        const capitanes = await capitanesService.getCapitanes();
        res.sendOk(capitanes);
    } catch (error) {
        req.logger.error(`Error fetching all captains: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getCapitanByCode(req, res) {
    const { cod_capitan } = req.params;
    let capitan;

    try {
        capitan = await capitanesService.getCapitanes({ cod_capitan });

        if (!capitan)
            return res.sendBadRequestError(`Captain with code ${cod_capitan} not found.`);

        res.sendOk(capitan);
    } catch (error) {
        req.logger.error(`Error fetching captain with code ${cod_capitan}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postCapitan(req, res) {
    const { first_name, last_name } = req.body;

    try {
        const capitan = await capitanesService.createCapitan({ first_name, last_name });
        res.sendCreated(capitan);
    } catch (error) {
        req.logger.error(`Error creating captain named ${first_name} ${last_name}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getCapitanes, getCapitanByCode, postCapitan };