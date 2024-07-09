import express from 'express';
import { config } from './config/dotenv.config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { initializePassport } from './config/passport.config.js'
import passport from 'passport';

import { PartesRouter } from './routes/partes.router.js';
import { BanderasRouter } from './routes/banderas.router.js';
import { BuquesRouter } from './routes/buques.router.js';
import { CapitanesRouter } from './routes/capitanes.router.js';
import { DiasRouter } from './routes/dias.router.js';
import { ManiobrasRouter } from './routes/maniobras.router.js';
import { RemolcadoresRouter } from './routes/remolcadores.router.js';
import { SolicitantesRouter } from './routes/solicitantes.router.js';
import { TripulantesRouter } from './routes/tripulantes.router.js';
import { UsersRouter } from './routes/users.router.js';
import { SessionsRouter } from './routes/sessions.router.js';

import { addLogger } from './config/logger.config.js';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"

const PORT = config.PORT;

const partesRouter = new PartesRouter();
const banderasRouter = new BanderasRouter();
const buquesRouter = new BuquesRouter();
const capitanesRouter = new CapitanesRouter();
const diasRouter = new DiasRouter();
const maniobrasRouter = new ManiobrasRouter();
const remolcadoresRouter = new RemolcadoresRouter();
const solicitantesRouter = new SolicitantesRouter();
const tripulantesRouter = new TripulantesRouter();
const usersRouter = new UsersRouter();
const sessionsRouter = new SessionsRouter();

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Tugboat Management API - Santiago Lapiana",
            description: "REST API for the management of tugboats, its crew, captains and recording their daily activities."
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(addLogger);

const allowedOrigins = ['https://administracion-puerto.vercel.app', 'http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use('/api/partes', partesRouter.getRouter());
app.use('/api/banderas', banderasRouter.getRouter());
app.use('/api/buques', buquesRouter.getRouter());
app.use('/api/capitanes', capitanesRouter.getRouter());
app.use('/api/dias', diasRouter.getRouter());
app.use('/api/maniobras', maniobrasRouter.getRouter());
app.use('/api/remolcadores', remolcadoresRouter.getRouter());
app.use('/api/solicitantes', solicitantesRouter.getRouter());
app.use('/api/tripulantes', tripulantesRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

mongoose.connect(config.DEVELOPMENT_DB_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Cannot connect to database " + error);
        process.exit();
    });

const serverExpress = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at ${(new Date())}`);
});