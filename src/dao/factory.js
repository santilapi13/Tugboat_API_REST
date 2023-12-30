import { config } from '../config/dotenv.config.js';
import mongoose from 'mongoose';

let Partes, Maniobras;
switch (config.PERSISTENCE) {
    case 'mongodb':
        mongoose.connect(config.DB_URL)
            .catch((error) => {
                console.log("Cannot connect to database " + error);
                process.exit();
            });

        Partes = await import('./mongodb/partesMongo.dao.js');
        Partes = Partes.PartesMongoDAO;
        Maniobras = await import('./mongodb/maniobrasMongo.dao.js');
        Maniobras = Maniobras.ManiobrasMongoDAO;
        break;
    default:
        throw new Error("Invalid persistence type");
}

export { Partes, Maniobras };