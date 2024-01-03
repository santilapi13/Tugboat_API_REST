import Router from './router.js';
import tripulantesController from '../controllers/tripulantes.controller.js';

export class TripulantesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], tripulantesController.getTripulantes);

        this.get('/:cod_buque', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], tripulantesController.getTripulanteByCode);
        
        this.post('/', ["ADMIN"], tripulantesController.postTripulante);
    }
}