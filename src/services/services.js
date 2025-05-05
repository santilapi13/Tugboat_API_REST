import * as modelos from '../dao/factory.js';

export class EntitiesService {
    constructor(dao) {
        this.dao = dao;
    }

    async get(query={}, options={}) {
        let { limit, page, sort, pagination } = options;
        limit = !limit ? 10 : limit;
        page = !page ? 1 : page;
        sort = !sort ? { name: 1, _id: 1 } : sort;

        options = { limit, page, sort };

        if (!pagination)
            return await this.dao.get(query, sort);
        else
            return await this.dao.paginate(query, options);
    }

    async getById(id) {
        const entity = await this.dao.get({ _id: id });
        return entity[0];
    }

    async create(entity) {
        return await this.dao.create(entity);
    }

    async update(id, entity) {
        return await this.dao.update(id, entity);
    }
}

export const banderasService = new EntitiesService(modelos.Banderas);
export const buquesService = new EntitiesService(modelos.Buques);
export const maniobrasService = new EntitiesService(modelos.Maniobras);
export const remolcadoresService = new EntitiesService(modelos.Remolcadores);
export const solicitantesService = new EntitiesService(modelos.Solicitantes);
export const tripulantesService = new EntitiesService(modelos.Tripulantes);
export const capitanesService = new EntitiesService(modelos.Capitanes);