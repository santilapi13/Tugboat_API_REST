import { Partes as DAO } from '../dao/factory.js';

class PartesService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getPartes(filter = {}) {
        return await this.dao.get(filter);
    }

    async getParteById(id) {
        const parte = await this.dao.get({ _id: id });
        return parte ? parte[0] : null;
    }

    async createParte(parte) {
        return await this.dao.create(parte);
    }

    async updateParte(id, parte) {
        return await this.dao.update(id, parte);
    }
}

export const partesService = new PartesService(DAO);