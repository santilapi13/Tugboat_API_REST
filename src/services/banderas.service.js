import { Banderas as DAO } from '../dao/factory.js';

class BanderasService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getBanderas(filter = {}) {
        return await this.dao.get(filter);
    }

    async createBandera(bandera) {
        return await this.dao.create(bandera);
    }

    async updateBanderaById(id, bandera) {
        return await this.dao.update(id, bandera);
    }

    async updateBanderaByCode(cod_bandera, bandera) {
        return await this.dao.updateByCode(cod_bandera, bandera);
    }
}

export const banderasService = new BanderasService(DAO);