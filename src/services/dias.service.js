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

    async addParteToDia(fecha, cod_parte) {
        return await this.dao.addParte(fecha, cod_parte);
    }

}

export const diasService = new DiasService(DAO);