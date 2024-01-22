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
            if (!remolcador[0]) throw new Error(`Remolcador with code ${query.remolcador} not found.`);
            query.remolcador = remolcador[0]._id;
        }

        if (!query.fecha) {
            result = await diaModel.find(query).limit(limit).sort(sort);
        } else {
            result = await diaModel.findByFecha(query.fecha.getFullYear(), query.fecha.getMonth(), query.fecha.getDate() + 1, query.remolcador);
        }

        return result;
    }

    async create(dia) {
        for (const tripulante of dia.tripulacion) {
            let fullTripulante = await tripulanteModel.find({ cod_tripulante: tripulante.tripulante });
            fullTripulante = fullTripulante[0];

            tripulante.tripulante = fullTripulante._id;
        }

        let remolcador = await remolcadorModel.find({ cod_remolcador: dia.cod_remolcador });
        remolcador = remolcador[0];
        dia.remolcador = remolcador._id;

        return await diaModel.create(dia);
    }

    async update(dia) {
        dia.remolcador = dia.cod_remolcador;
        delete dia.cod_remolcador;
        
        let oldDia = await this.get(dia, { limit: 1, sort: { fecha: 'desc' } });
        oldDia = oldDia[0];
        if (!oldDia) throw new Error(`Failed to update: Dia with fecha ${dia.fecha} and cod_remolcador ${dia.remolcador} not found.`);

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