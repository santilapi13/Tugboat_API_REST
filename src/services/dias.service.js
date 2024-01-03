import { Dias as DAO } from '../dao/factory.js';

class DiasService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getDias(filter = {}) {
        return await this.dao.get(filter);
    }

    async createDia(dia) {
        return await this.dao.create(dia);
    }

    async updateDiaById(id, dia) {
        return await this.dao.update(id, dia);
    }

}

export const diasService = new DiasService(DAO);