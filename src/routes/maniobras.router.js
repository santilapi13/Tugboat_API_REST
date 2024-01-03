import Router from './router.js';
import maniobrasController from '../controllers/maniobras.controller.js';

export class ManiobrasRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], maniobrasController.getManiobras);

        this.get('/:cod_buque', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], maniobrasController.getManiobraByCode);
        
        this.post('/', ["ADMIN"], maniobrasController.postManiobra);
    }
}