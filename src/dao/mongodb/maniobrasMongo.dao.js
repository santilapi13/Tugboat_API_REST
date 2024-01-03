import mongoose from 'mongoose';
import { maniobraModel } from '../model/maniobra.model.js'
import utils from './utils.mongodb.js';

export class ManiobrasMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter['_id'] && !mongoose.Types.ObjectId.isValid(filter['_id']))
            throw new Error('Invalid id');

        let result = await maniobraModel.find(filter);

        return result;
    }

    async create(maniobra) {
        return await maniobraModel.create(maniobra);
    }

    async update(id, maniobra) {
        const validate = await utils.validateExistence(id, maniobraModel);

        if (validate.error)
            throw new Error(validate.msg);

        return await maniobraModel.findByIdAndUpdate(id, maniobra, { new: true });
    }

    async updateByCode(cod_maniobra, maniobra) {
        return await maniobraModel.findOneAndUpdate({ cod_maniobra }, maniobra, { new: true });
    }
}