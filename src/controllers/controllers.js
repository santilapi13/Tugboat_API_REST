import { isValidObjectId } from 'mongoose';
import { banderasService, buquesService, maniobrasService, remolcadoresService, solicitantesService, tripulantesService, capitanesService } from '../services/services.js';

export class Controller {
    constructor(service, name) {
        this.service = service;
        this.name = name;
    }

    async get(req, res) {
        let entities;
        try {
            entities = await this.service.get();
            res.sendOk(entities);
        } catch (error) {
            req.logger.error(`Error fetching all ${this.name}: ${error.message}`);
            res.sendInternalServerError(`Error fetching all ${this.name}: ${error.message}`);
        }
    }
    
    async getById(req, res) {
        const { id } = req.params;
        let entity;
    
        try {
            entity = await this.service.getById(id);
    
            if (!entity)
                return res.sendBadRequestError(`${this.name}s with id ${id} not found.`);
    
            res.sendOk(entity);
        } catch (error) {
            req.logger.error(`Error fetching ${this.name} by id ${id}: ${error.message}`);
            res.sendInternalServerError(`Error fetching ${this.name} by id ${id}: ${error.message}`);
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { title } = req.body;

        if (!title) {
            return res.sendBadRequestError('New title is required');
        }

        if (!isValidObjectId(id)) {
            return res.sendBadRequestError('Invalid id');
        }

        try {
            const entity = await this.service.update(id, { title });
            res.sendOk(entity);
        } catch (error) {
            req.logger.error(`Error updating ${this.title}: ${error.message}`);
            res.sendInternalServerError(error.message);
        }
    }
    
    async create(req, res) {
        const { title } = req.body;
        
        try {
            const entity = await this.service.create({ title });
            res.sendCreated(entity);
        } catch (error) {
            req.logger.error(`Error creating ${this.name} named ${title}: ${error.message}`);
            res.sendInternalServerError(error.message);
        }
    }
}

export const banderasController = new Controller(banderasService, 'bandera');
export const buquesController = new Controller(buquesService, 'buque');
export const maniobrasController = new Controller(maniobrasService, 'maniobra');
export const remolcadoresController = new Controller(remolcadoresService, 'remolcador');
export const solicitantesController = new Controller(solicitantesService, 'solicitante');
export const tripulantesController = new Controller(tripulantesService, 'tripulante');
export const capitanesController = new Controller(capitanesService, 'capitan');