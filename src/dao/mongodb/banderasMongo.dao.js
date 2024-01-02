import { banderaModel } from '../model/bandera.model.js'
import utils from './utils.mongodb.js';

export class BanderasMongoDAO {
    constructor() {}

    async get() {
        let result = await banderaModel.find();
        return result;
    }

    async create(bandera) {
        return await banderaModel.create(bandera);
    }

    async update(id, bandera) {
        const validate = await utils.validateExistence(id, banderaModel);

        if (validate.error)
            throw new Error(validate.msg);

        return await banderaModel.findByIdAndUpdate(id, bandera, { new: true });
    }
}