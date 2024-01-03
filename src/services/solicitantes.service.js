import { Solicitantes as DAO } from '../dao/factory.js';

class SolicitantesService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getSolicitantes(filter = {}) {
        return await this.dao.get(filter);
    }

    async createSolicitante(solicitante) {
        return await this.dao.create(solicitante);
    }

    async updateSolicitanteById(id, solicitante) {
        return await this.dao.update(id, solicitante);
    }

    async updateSolicitanteByCode(cod_solicitante, solicitante) {
        return await this.dao.updateByCode(cod_solicitante, solicitante);
    }
}

export const solicitantesService = new SolicitantesService(DAO);