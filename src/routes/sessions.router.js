import Router from './router.js'
import { passportCall } from '../utils.js';
import sessionsController from '../controllers/sessions.controller.js';

export class SessionsRouter extends Router {
    init() {
        this.post('/signup', ['ADMIN'], passportCall('signup'), sessionsController.signup);

        this.post('/login', ['PUBLIC'], passportCall('login'), sessionsController.login);

        this.post('/logout', ['ADMIN', 'CAPITAN', 'CONTADOR', 'SUPERVISOR'], sessionsController.logout);
    }
}