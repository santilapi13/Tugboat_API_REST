import Router from './router.js';
import diasController from '../controllers/dias.controller.js';

export class DiasRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "ADMIN"], diasController.getDias);
        
        this.get('/:fecha', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], diasController.getDiaByFecha);
        
        this.post('/', ["CAPITAN", "ADMIN"], diasController.postDia);

        this.put('/', ["CAPITAN", "ADMIN"], diasController.putDia);
    }
}