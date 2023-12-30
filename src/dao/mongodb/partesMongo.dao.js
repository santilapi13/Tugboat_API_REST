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

    async update(id, parte) {
        const validate = await utils.validateExistence(id, parteModel);

        if (validate.error)
            throw new Error(validate.msg);

        return await parteModel.findByIdAndUpdate(id, parte, { new: true });
    }
}