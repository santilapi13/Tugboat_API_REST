import mongoose from "mongoose";
import { diaModel } from "../model/dia.model.js";
import { partesService } from "../../services/partes.service.js";
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

    async addParte(fecha, cod_parte) {
        const dia = await diaModel.findOne({ fecha: fecha });
        if (!dia) throw new Error("Dia not found.");

        const parte = await partesService.getParteByCode(cod_parte);
        if (!parte) throw new Error("Parte not found.");

        return await diaModel.findByIdAndUpdate(dia._id, { $push: { partes: parte._id } }, { new: true });
    }
}