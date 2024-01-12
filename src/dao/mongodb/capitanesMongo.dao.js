import mongoose from "mongoose";
import { capitanModel } from "../model/capitan.model.js";
import utils from "./utils.mongodb.js";

export class CapitanesMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter["_id"] && !mongoose.Types.ObjectId.isValid(filter["_id"]))
            throw new Error("Invalid id");

        let result = await capitanModel.find(filter);
        return result;
    }

    async create(capitan) {
        let lastCapitan = await capitanModel.findOne({}, {}, { sort: { 'cod_capitan': -1 } });
        capitan.cod_capitan = lastCapitan ? parseInt(lastCapitan.cod_capitan) + 1 : 1;
        return await capitanModel.create(capitan);
    }

    async update(id, capitan) {
        const validate = await utils.validateExistence(id, capitanModel);

        if (validate.error) throw new Error(validate.msg);

        return await capitanModel.findByIdAndUpdate(id, capitan, { new: true });
    }

    async updateByCode(cod_capitan, capitan) {
        return await capitanModel.findOneAndUpdate({ cod_capitan }, capitan, { new: true });
    }
}