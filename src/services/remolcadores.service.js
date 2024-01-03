import { Remolcadores as DAO } from '../dao/factory.js';

class RemolcadoresService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getRemolcadores(filter = {}) {
        return await this.dao.get(filter);
    }

    async createRemolcador(remolcador) {
        return await this.dao.create(remolcador);
    }

    async updateRemolcadorById(id, remolcador) {
        return await this.dao.update(id, remolcador);
    }

    async updateRemolcadorByCode(cod_remolcador, remolcador) {
        return await this.dao.updateByCode(cod_remolcador, remolcador);
    }
}

export const remolcadoresService = new RemolcadoresService(DAO);