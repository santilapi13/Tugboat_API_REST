import express from 'express';
import { config } from './config/dotenv.config.js';
import cors from 'cors';
import mongoose from 'mongoose';

import { PartesRouter } from './routes/partes.router.js';
import { BanderasRouter } from './routes/banderas.router.js';
import { BuquesRouter } from './routes/buques.router.js';
import { CapitanesRouter } from './routes/capitanes.router.js';
import { DiasRouter } from './routes/dias.router.js';
import { ManiobrasRouter } from './routes/maniobras.router.js';
import { RemolcadoresRouter } from './routes/remolcadores.router.js';
import { SolicitantesRouter } from './routes/solicitantes.router.js';
import { TripulantesRouter } from './routes/tripulantes.router.js';

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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/partes', partesRouter.getRouter());
app.use('/api/banderas', banderasRouter.getRouter());
app.use('/api/buques', buquesRouter.getRouter());
app.use('/api/capitanes', capitanesRouter.getRouter());
app.use('/api/dias', diasRouter.getRouter());
app.use('/api/maniobras', maniobrasRouter.getRouter());
app.use('/api/remolcadores', remolcadoresRouter.getRouter());
app.use('/api/solicitantes', solicitantesRouter.getRouter());
app.use('/api/tripulantes', tripulantesRouter.getRouter());

mongoose.connect(config.DEVELOPMENT_DB_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Cannot connect to database " + error);
        process.exit();
    });

const serverExpress = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});