import Router from './router.js';
import usersController from '../controllers/users.controller.js';

export class UsersRouter extends Router {
    init() {
        this.get('/', ["ADMIN"], usersController.getUsers);

        this.get('/:cod_user', ["ADMIN"], usersController.getUserById);

        this.delete('/:cod_user', ["ADMIN"], usersController.deleteUser);
    }
}