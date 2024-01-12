import mongoose from 'mongoose';
import { parteModel } from '../model/parte.model.js'
import utils from './utils.mongodb.js';

export class PartesMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter['_id'] && !mongoose.Types.ObjectId.isValid(filter['_id']))
            throw new Error('Invalid id');

        let result = await parteModel.find(filter);

        return result;
    }

    async create(parte) {
        return await parteModel.create(parte);
    }

    async update(cod_parte, newParte) {
        const parte = await this.get({ cod_parte: cod_parte });
        const id = parte[0]._id;

        return await parteModel.findByIdAndUpdate(id, newParte, { new: true });
    }

    async delete(cod_parte) {
        const parte = await this.get({ cod_parte: cod_parte });
        const id = parte[0]._id;

        return await parteModel.findByIdAndDelete(id);
    }
}