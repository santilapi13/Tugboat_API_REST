import Router from './router.js';
import partesController from '../controllers/partes.controller.js';

export class PartesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], partesController.getPartes);
        
        this.post('/', ["CAPITAN", "ADMIN"], partesController.postParte);
    }
}