import { tripulantesService } from '../services/tripulantes.service.js';

async function getTripulantes(req, res) {
    try {
        const tripulantes = await tripulantesService.getTripulantes();
        res.sendOk(tripulantes);
    } catch (error) {
        req.logger.error(`Error fetching all crew members: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getTripulanteByCode(req, res) {
    const { cod_tripulante } = req.params;
    let tripulante;

    try {
        tripulante = await tripulantesService.getTripulantes({ cod_tripulante });

        if (!tripulante)
            return res.sendBadRequestError(`Crew member with code ${cod_tripulante} not found.`);

        res.sendOk(tripulante);
    } catch (error) {
        req.logger.error(`Error fetching crew member with code ${cod_tripulante}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postTripulante(req, res) {
    const { first_name, last_name } = req.body;

    try {
        const tripulante = await tripulantesService.createTripulante({ first_name, last_name });
        res.sendCreated(tripulante);
    } catch (error) {
        req.logger.error(`Error creating crew member named ${first_name} ${last_name}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getTripulantes, getTripulanteByCode, postTripulante };