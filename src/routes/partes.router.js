import Router from './router.js';
import partesController from '../controllers/partes.controller.js';

export class PartesRouter extends Router {
    init() {
        this.get('/', ["PUBLIC"], partesController.getPartes);
        
        this.post('/', ["CAPITAN"], partesController.postParte);
    }
}