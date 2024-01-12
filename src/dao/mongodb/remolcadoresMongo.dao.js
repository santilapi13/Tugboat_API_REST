import mongoose from "mongoose";
import { remolcadorModel } from "../model/remolcador.model.js";
import utils from "./utils.mongodb.js";

export class RemolcadoresMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter["_id"] && !mongoose.Types.ObjectId.isValid(filter["_id"]))
            throw new Error("Invalid id");

        let result = await remolcadorModel.find(filter);
        return result;
    }

    async create(remolcador) {
        let lastRemolcador = await remolcadorModel.findOne({}, {}, { sort: { 'cod_remolcador': -1 } });
        remolcador.cod_remolcador = lastRemolcador ? parseInt(lastRemolcador.cod_remolcador) + 1 : 1;
        return await remolcadorModel.create(remolcador);
    }

    async update(id, remolcador) {
        const validate = await utils.validateExistence(id, remolcadorModel);

        if (validate.error) throw new Error(validate.msg);

        return await remolcadorModel.findByIdAndUpdate(id, remolcador, { new: true });
    }

    async updateByCode(cod_remolcador, remolcador) {
        return await remolcadorModel.findOneAndUpdate({ cod_remolcador }, remolcador, { new: true });
    }
}
