import { Tripulantes as DAO } from '../dao/factory.js';

class TripulantesService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getTripulantes(filter = {}) {
        return await this.dao.get(filter);
    }

    async createTripulante(tripulante) {
        return await this.dao.create(tripulante);
    }

    async updateTripulanteById(id, tripulante) {
        return await this.dao.update(id, tripulante);
    }

    async updateTripulanteByCode(cod_tripulante, tripulante) {
        return await this.dao.updateByCode(cod_tripulante, tripulante);
    }
}

export const tripulantesService = new TripulantesService(DAO);