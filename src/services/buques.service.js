import { Buques as DAO } from '../dao/factory.js';

class BuquesService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getBuques(filter = {}) {
        return await this.dao.get(filter);
    }

    async createBuque(buque) {
        return await this.dao.create(buque);
    }

    async updateBuqueById(id, buque) {
        return await this.dao.update(id, buque);
    }

    async updateBuqueByCode(cod_buque, buque) {
        return await this.dao.updateByCode(cod_buque, buque);
    }
}

export const buquesService = new BuquesService(DAO);