import Router from './router.js';
import capitanesController from '../controllers/capitanes.controller.js';

export class CapitanesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], capitanesController.getCapitanes);

        this.get('/:cod_buque', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], capitanesController.getCapitanByCode);
        
        this.post('/', ["ADMIN"], capitanesController.postCapitan);
    }
}