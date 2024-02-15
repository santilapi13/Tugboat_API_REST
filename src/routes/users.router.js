import Router from './router.js';
import usersController from '../controllers/users.controller.js';

export class UsersRouter extends Router {
    init() {
        this.get('/', ["ADMIN"], usersController.getUsers);

        this.get('/:uid', ["ADMIN"], usersController.getUserById);

        this.delete('/:uid', ["ADMIN"], usersController.deleteUser);
    }
}