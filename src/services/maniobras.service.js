import { Maniobras as DAO } from '../dao/factory.js';

class ManiobrasService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getManiobras(filter = {}) {
        return await this.dao.get(filter);
    }

    async getManiobraById(id) {
        const maniobra = await this.dao.get({ _id: id });
        return maniobra ? maniobra[0] : null;
    }

    async createManiobra(maniobra) {
        return await this.dao.create(maniobra);
    }

    async updateManiobraById(id, maniobra) {
        return await this.dao.update(id, maniobra);
    }

    async updateManiobraByCode(cod_maniobra, maniobra) {
        return await this.dao.updateByCode(cod_maniobra, maniobra);
    }
}

export const maniobrasService = new ManiobrasService(DAO);