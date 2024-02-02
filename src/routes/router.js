import { Router as ExpressRouter } from 'express';
import { config } from '../config/dotenv.config.js';
import jwt from 'jsonwebtoken';

const SUPERVISOR_KEY = config.SUPERVISOR_KEY;
const CAPTAIN_KEY = config.CAPTAIN_KEY;
const ADMIN_KEY = config.ADMIN_KEY;

export default class Router {
    constructor() {
        this.router = ExpressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send({ message: 'Internal server error', error });
            }
        });
    }

    generateCustomResponses = (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        res.sendOk = payload => res.status(200).send({ 
            status: "success",
            payload
        });

        res.sendCreated = payload => res.status(201).send({
            status: "success",
            payload
        });

        res.sendBadRequestError = error => res.status(400).send({
            status: "error",
            error
        });

        res.sendUnauthorizedError = error => res.status(401).send({
            status: "error",
            error
        });

        res.sendForbiddenError = error => res.status(403).send({
            status: "error",
            error
        });

        res.sendNotFoundError = error => res.status(404).send({
            status: "error",
            error
        });

        res.sendInternalServerError = error => res.status(500).send({
            status: "error",
            error
        });

        next();
    }

    handlePolicies = policies => (req, res, next) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token)
            return res.sendUnauthorizedError('No token provided');

        try {
            const decodedWithoutVerification = jwt.decode(token);

            if (!decodedWithoutVerification)
                return res.sendUnauthorizedError('Invalid token');

            const { role } = decodedWithoutVerification;

            let key;
            switch (role) {
                case "SUPERVISOR": key = SUPERVISOR_KEY; 
                break;
                case "CAPTAIN": key = CAPTAIN_KEY;
                break;
                case "ADMIN": key = ADMIN_KEY;
                break;
                default: key = null; 
            }

            if (!key)
                return res.sendUnauthorizedError('Invalid role');

            jwt.verify(token, key, (err, decoded) => {
                if (err) return res.sendUnauthorizedError('Invalid token');

                if (!policies.includes(decoded.role.toUpperCase())) return res.sendForbiddenError('You are not allowed to access this resource');
                
                req.user = decoded;
            });
        } catch (error) {
            return res.sendUnauthorizedError(error.message);
        }

        next();
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }
}