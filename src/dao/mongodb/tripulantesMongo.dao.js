import mongoose from 'mongoose';
import { tripulanteModel } from '../model/tripulante.model.js'
import utils from './utils.mongodb.js';

export class TripulantesMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter['_id'] && !mongoose.Types.ObjectId.isValid(filter['_id']))
            throw new Error('Invalid id');

        let result = await marineroModel.find(filter);
        return result;
    }

    async create(tripulante) {
        return await tripulanteModel.create(tripulante);
    }

    async update(id, tripulante) {
        const validate = await utils.validateExistence(id, tripulanteModel);

        if (validate.error)
            throw new Error(validate.msg);

        return await tripulanteModel.findByIdAndUpdate(id, tripulante, { new: true });
    }

    async updateByCode(cod_tripulante, tripulante) {
        return await tripulanteModel.findOneAndUpdate({ cod_tripulante }, tripulante, { new: true });
    }
}