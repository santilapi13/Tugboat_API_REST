import mongoose from "mongoose";
import { diaModel } from "../model/dia.model.js";
import utils from "./utils.mongodb.js";

export class DiasMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter["_id"] && !mongoose.Types.ObjectId.isValid(filter["_id"]))
            throw new Error("Invalid id");

        let result = await diaModel.find(filter);
        return result;
    }

    async create(dia) {
        return await diaModel.create(dia);
    }

    async update(id, dia) {
        const validate = await utils.validateExistence(id, diaModel);

        if (validate.error) throw new Error(validate.msg);

        return await diaModel.findByIdAndUpdate(id, dia, { new: true });
    }
}