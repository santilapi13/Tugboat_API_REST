import Router from './router.js';
import diasController from '../controllers/dias.controller.js';

export class DiasRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], diasController.getDias);
        
        this.post('/', ["CAPITAN", "ADMIN"], diasController.postDia);
    }
}