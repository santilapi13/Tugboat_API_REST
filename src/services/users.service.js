import { Users as DAO } from '../dao/factory.js';

class UsersService {
    constructor(dao) {
        this.dao = new dao();
    }

    async getUsers(query = {}) {
        return await this.dao.get(query);
    }

    async getUserByUsername(username) {
        let user = await this.dao.get({ username });
        
        if (user && user.length > 0)
            return user[0];

        return null;
    
    }

    async createUser(user) {
        return await this.dao.create(user);
    }

    async deleteUser(id) {
        return await this.dao.delete(id);
    }
}

export const usersService = new UsersService(DAO);