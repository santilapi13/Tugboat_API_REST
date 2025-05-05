import { banderaModel } from '../model/bandera.model.js'
import { buqueModel } from '../model/buque.model.js'
import { maniobraModel } from '../model/maniobra.model.js'
import { remolcadorModel } from '../model/remolcador.model.js'
import { solicitanteModel } from '../model/solicitante.model.js'
import { tripulanteModel } from '../model/tripulante.model.js'
import { capitanModel } from '../model/capitan.model.js'

export class EntitiesMongoDAO {
    constructor(model, name) {
        this.model = model;
        this.name = name;
    }

    async get(query = {}, sortBy) {
        return await this.model.find(query).sort(sortBy);
    }

    async paginate(query = {}, filters) {
        const entities = await this.model.paginate(query, { lean: true, ...filters });
        return entities;
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        const updatedEntity = await this.model.findByIdAndUpdate(id, entity, { new: true });
        if (updatedEntity === null)
            throw new Error(this.name + " to update not found");
        return updatedEntity;
    }

    async delete(id) {
        const removedEntity = await this.model.findByIdAndDelete(id);
        if (removedEntity === null)
            throw new Error(this.name + " to delete not found");

        return removedEntity;
    }
}

export const banderasMongoDAO = new EntitiesMongoDAO(banderaModel, "bandera");
export const buquesMongoDAO = new EntitiesMongoDAO(buqueModel, "buque");
export const maniobrasMongoDAO = new EntitiesMongoDAO(maniobraModel, "maniobra");
export const remolcadoresMongoDAO = new EntitiesMongoDAO(remolcadorModel, "remolcador");
export const solicitantesMongoDAO = new EntitiesMongoDAO(solicitanteModel, "solicitante");
export const tripulantesMongoDAO = new EntitiesMongoDAO(tripulanteModel, "tripulante");
export const capitanesMongoDAO = new EntitiesMongoDAO(capitanModel, "capitan");