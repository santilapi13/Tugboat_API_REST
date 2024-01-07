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
}

export const partesService = new PartesService(DAO);