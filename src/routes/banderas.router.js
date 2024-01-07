import Router from './router.js';
import banderasController from '../controllers/banderas.controller.js';

export class BanderasRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], banderasController.getBanderas);

        this.get('/:cod_bandera', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], banderasController.getBanderaByCode);
        
        this.post('/', ["ADMIN"], banderasController.postBanderas);
    }
}