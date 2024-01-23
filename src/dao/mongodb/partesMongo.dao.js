import mongoose from 'mongoose';
import { parteModel } from '../model/parte.model.js'
import utils from './utils.mongodb.js';

export class PartesMongoDAO {
    constructor() {}

    async get(query = {}, { limit, sort }) {
        query = await utils.parteCodesToIds({ remolcador: query.cod_remolcador, buque: query.cod_buque, solicitante: query.cod_solicitante, confirmado: query.confirmado, facturado: query.facturado  });

        if (!query.remolcador) delete query.remolcador;
        if (!query.buque) delete query.buque;
        if (!query.olicitante) delete query.solicitante;
        if (query.confirmado === undefined) delete query.confirmado;
        if (query.facturado === undefined) delete query.facturado;

        let result = await parteModel.find(query).limit(limit).sort(sort);
        return result;
    }

    async create(parte) {
        let lastParte = await parteModel.findOne({}, {}, { sort: { 'cod_parte': -1 } });
        parte.cod_parte = lastParte ? parseInt(lastParte.cod_parte) + 1 : 1;

        parte = await utils.parteCodesToIds(parte);

        return await parteModel.create(parte);
    }

    async update(cod_parte, newParte) {
        const parte = await this.get({ cod_parte: cod_parte });
        const id = parte[0]._id;

        return await parteModel.findByIdAndUpdate(id, newParte, { new: true });
    }

    async delete(cod_parte) {
        const parte = await this.get({ cod_parte: cod_parte });
        const id = parte[0]._id;

        return await parteModel.findByIdAndDelete(id);
    }
}