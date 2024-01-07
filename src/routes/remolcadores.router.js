import Router from './router.js';
import remolcadoresController from '../controllers/remolcadores.controller.js';

export class RemolcadoresRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], remolcadoresController.getRemolcadores);

        this.get('/:cod_remolcador', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], remolcadoresController.getRemolcadorByCode);
        
        this.post('/', ["ADMIN"], remolcadoresController.postRemolcador);
    }
}