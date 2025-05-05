import { Router as ExpressRouter } from 'express';
import { config } from '../config/dotenv.config.js';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = config.PRIVATE_KEY;

export default class Router {
    constructor(controller) {
        this.controller = controller;
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
        if (policies[0] === "PUBLIC") return next();

        const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

        if (!token)
            return res.sendUnauthorizedError('No token provided');

        try {
            jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
                if (err) return res.sendUnauthorizedError('Invalid token');

                if (!policies.includes(decoded.user.role.toUpperCase())) return res.sendForbiddenError('User not allowed to access this resource');
                
                req.user = decoded.user;
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

    patch(path, policies, ...callbacks) {
        this.router.patch(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }
}