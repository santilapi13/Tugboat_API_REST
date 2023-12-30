import express from 'express';
import { config } from './config/dotenv.config.js';
import cors from 'cors';
import { PartesRouter } from './routes/partes.router.js';

const PORT = config.PORT;

const partesRouter = new PartesRouter();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/partes', partesRouter.getRouter());

const serverExpress = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});