import mongoose from "mongoose";
import { diaModel } from "../model/dia.model.js";
import { parteModel } from "../model/parte.model.js";
import { tripulanteModel } from "../model/tripulante.model.js";

export class DiasMongoDAO {
    constructor() {}

    async get(query = {}, { limit, sort }) {
        if (query["_id"] && !mongoose.Types.ObjectId.isValid(query["_id"]))
            throw new Error("Invalid id");

        let result = await diaModel.find(query).limit(limit).sort(sort);
        return result;
    }

    async getByFecha({ fecha }) {
        let result = await diaModel.findByFecha(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        return result;
    }

    async create(dia) {
        for (const tripulante of dia.tripulacion) {
            let fullTripulante = await tripulanteModel.find({ cod_tripulante: tripulante.tripulante });
            fullTripulante = fullTripulante[0];

            tripulante.tripulante = fullTripulante._id;
        }
        return await diaModel.create(dia);
    }

    async update(dia) {
        return await diaModel.updateOne({ fecha: dia.fecha }, { tripulacion: dia.tripulacion, feriado: dia.feriado });
    }

    async addParte(fecha, cod_parte) {
        const dia = await diaModel.findOne({ fecha: fecha });
        if (!dia) throw new Error("Dia not found.");

        const parte = await parteModel.findOne({ cod_parte: cod_parte });
        if (!parte) throw new Error("Parte not found.");

        return await diaModel.findByIdAndUpdate(dia._id, { $push: { partes: parte._id } }, { new: true });
    }
}