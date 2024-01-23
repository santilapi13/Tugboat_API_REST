import { Partes as DAO } from '../dao/factory.js';

class PartesService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getPartes(query = {}, sort = { hora_inicio: 'desc' }, limit = 0) {
        const filters = { sort, limit };

        return await this.dao.get(query, filters);
    }

    async getParteById(id) {
        const parte = await this.dao.get({ _id: id });
        return parte ? parte[0] : null;
    }

    async getParteByCode(cod_parte) {
        const parte = await this.dao.get({ cod_parte });
        return parte ? parte[0] : null;
    }

    async createParte(parte) {
        return await this.dao.create(parte);
    }

    async updateParte(cod_parte, parte) {
        return await this.dao.update(cod_parte, parte);
    }

    async deleteParte(cod_parte) {
        return await this.dao.delete(cod_parte);
    }
}

export const partesService = new PartesService(DAO);