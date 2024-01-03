import { Capitanes as DAO } from '../dao/factory.js';

class CapitanesService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getCapitanes(filter = {}) {
        return await this.dao.get(filter);
    }

    async createCapitan(capitan) {
        return await this.dao.create(capitan);
    }

    async updateCapitanById(id, capitan) {
        return await this.dao.update(id, capitan);
    }

    async updateCapitanByCode(cod_capitan, capitan) {
        return await this.dao.updateByCode(cod_capitan, capitan);
    }
}

export const capitanesService = new CapitanesService(DAO);