import { Dias as DAO } from '../dao/factory.js';

class DiasService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getDias(query = {}, sort = { fecha: 'desc' }, limit = 7) {
        const filters = { limit, sort };
        return await this.dao.get(query, filters);
    }

    async createDia(dia) {
        return await this.dao.create(dia);
    }

    async addParteToDia(fecha, cod_parte) {
        return await this.dao.addParte(fecha, cod_parte);
    }

    async updateDia(dia) {
        return await this.dao.update(dia);
    }

}

export const diasService = new DiasService(DAO);