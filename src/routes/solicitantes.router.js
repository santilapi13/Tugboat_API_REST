import Router from './router.js';
import solicitantesController from '../controllers/solicitantes.controller.js';

export class SolicitantesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], solicitantesController.getSolicitantes);

        this.get('/:cod_solicitante', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], solicitantesController.getSolicitanteByCode);
        
        this.post('/', ["ADMIN"], solicitantesController.postSolicitante);
    }
}