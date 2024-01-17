import mongoose from "mongoose";
import { diaModel } from "../model/dia.model.js";
import { parteModel } from "../model/parte.model.js";
import { tripulanteModel } from "../model/tripulante.model.js";
import { remolcadorModel } from "../model/remolcador.model.js";

export class DiasMongoDAO {
    constructor() {}

    async get(query = {}, { limit, sort }) {
        let result;

        if (query.remolcador) {
            const remolcador = await remolcadorModel.find({ cod_remolcador: query.remolcador });
            query.remolcador = remolcador[0]._id;
        }

        if (!query.fecha) {
            result = await diaModel.find(query).limit(limit).sort(sort);
        } else {
            result = await diaModel.findByFecha(query.fecha.getFullYear(), query.fecha.getMonth(), query.fecha.getDate(), query.remolcador);
        }

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
        let oldDia = await this.getByFecha(dia);
        for (const tripulante of dia.tripulacion) {
            let fullTripulante = await tripulanteModel.find({ cod_tripulante: tripulante.tripulante });
            fullTripulante = fullTripulante[0];

            tripulante.tripulante = fullTripulante._id;
        }
        return await diaModel.findByIdAndUpdate({ _id: oldDia._id }, { tripulacion: dia.tripulacion, feriado: dia.feriado }, { new: true });
    }

    async addParte(fecha, cod_parte) {
        const dia = await diaModel.findOne({ fecha: fecha });
        if (!dia) throw new Error("Dia not found.");

        const parte = await parteModel.findOne({ cod_parte: cod_parte });
        if (!parte) throw new Error("Parte not found.");

        return await diaModel.findByIdAndUpdate(dia._id, { $push: { partes: parte._id } }, { new: true });
    }
}