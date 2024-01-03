import mongoose from "mongoose";
import { solicitanteModel } from "../model/solicitante.model.js";
import utils from "./utils.mongodb.js";

export class SolicitantesMongoDAO {
    constructor() {}

    async get(filter = {}) {
        if (filter["_id"] && !mongoose.Types.ObjectId.isValid(filter["_id"]))
            throw new Error("Invalid id");

        let result = await solicitanteModel.find(filter);
        return result;
    }

    async create(solicitante) {
        return await solicitanteModel.create(solicitante);
    }

    async update(id, solicitante) {
        const validate = await utils.validateExistence(id, solicitanteModel);

        if (validate.error) throw new Error(validate.msg);

        return await solicitanteModel.findByIdAndUpdate(id, solicitante, { new: true });
    }

    async updateByCode(cod_solicitante, solicitante) {
        return await solicitanteModel.findOneAndUpdate({ cod_solicitante }, solicitante, { new: true });
    }
}