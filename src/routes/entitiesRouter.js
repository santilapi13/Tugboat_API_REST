import Router from './router.js';
import { banderasController, buquesController, maniobrasController, remolcadoresController, solicitantesController, tripulantesController, capitanesController } from '../controllers/controllers.js';

export class EntitiesRouter extends Router {
    init() {
        this.get('/', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], async (req, res) => this.controller.get(req, res));

        this.get('/:id', ["CONTADOR", "SUPERVISOR", "CAPITAN", "ADMIN"], async (req, res) => this.controller.getById(req, res));
        
        this.post('/', ["ADMIN"], async (req, res) => this.controller.create(req, res));

        this.patch('/:id', ["ADMIN"], async (req, res) => this.controller.update(req, res));
    }
}

export const banderasRouter = new EntitiesRouter(banderasController);
export const buquesRouter = new EntitiesRouter(buquesController);
export const maniobrasRouter = new EntitiesRouter(maniobrasController);
export const remolcadoresRouter = new EntitiesRouter(remolcadoresController);
export const solicitantesRouter = new EntitiesRouter(solicitantesController);
export const tripulantesRouter = new EntitiesRouter(tripulantesController);
export const capitanesRouter = new EntitiesRouter(capitanesController);