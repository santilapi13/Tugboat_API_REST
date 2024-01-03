import Router from './router.js';
import buquesController from '../controllers/buques.controller.js';

export class BuquesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], buquesController.getBuques);

        this.get('/:cod_buque', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], buquesController.getBuqueByCode);
        
        this.post('/', ["ADMIN"], buquesController.postBuque);
    }
}