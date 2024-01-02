import mongoose from 'mongoose';
import { buqueModel } from '../model/buque.model.js'
import utils from './utils.mongodb.js';

export class BuquesMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter['_id'] && !mongoose.Types.ObjectId.isValid(filter['_id']))
            throw new Error('Invalid id');

        let result = await buqueModel.find(filter);
        return result;
    }

    async create(buque) {
        return await buqueModel.create(buque);
    }

    async update(id, buque) {
        const validate = await utils.validateExistence(id, buqueModel);

        if (validate.error)
            throw new Error(validate.msg);

        return await buqueModel.findByIdAndUpdate(id, buque, { new: true });
    }
}