import Router from './router.js';
import partesController from '../controllers/partes.controller.js';

export class PartesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], partesController.getPartes);
        
        this.post('/', ["CAPITAN", "ADMIN"], partesController.postParte);

        this.post('/pendientes', ["CAPITAN", "ADMIN"], partesController.postPartesPendientes);

        this.put('/:cod_parte', ["SUPERVISOR", "ADMIN"], partesController.putParte);

        this.put('/:cod_parte/confirmacion', ["SUPERVISOR", "ADMIN"], partesController.confirmarParte)

        this.put('/:cod_parte/facturacion', ["CONTADOR", "ADMIN"], partesController.facturarParte);
    }
}