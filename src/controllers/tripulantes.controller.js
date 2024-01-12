import { tripulantesService } from '../services/tripulantes.service.js';

async function getTripulantes(req, res) {
    try {
        const tripulantes = await tripulantesService.getTripulantes();
        res.sendOk(tripulantes);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function getTripulanteByCode(req, res) {
    const { cod_buque } = req.params;

    try {
        const tripulante = await tripulantesService.getTripulantes({ cod_buque });
        res.sendOk(tripulante);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function postTripulante(req, res) {
    const { first_name, last_name } = req.body;

    try {
        const tripulante = await tripulantesService.createTripulante({ first_name, last_name });
        res.sendCreated(tripulante);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

export default { getTripulantes, getTripulanteByCode, postTripulante };