import { config } from '../config/dotenv.config.js';
import mongoose from 'mongoose';

const mongodbPersistence = async function() {
    mongoose.connect(config.DEVELOPMENT_DB_URL)
            .catch((error) => {
                console.log("Cannot connect to database " + error);
                process.exit();
            });

        Partes = await import('./mongodb/partesMongo.dao.js');
        Partes = Partes.PartesMongoDAO;
        Maniobras = await import('./mongodb/maniobrasMongo.dao.js');
        Maniobras = Maniobras.ManiobrasMongoDAO;
        Buques = await import('./mongodb/buquesMongo.dao.js');
        Buques = Buques.BuquesMongoDAO;
        Banderas = await import('./mongodb/banderasMongo.dao.js');
        Banderas = Banderas.BanderasMongoDAO;
        Capitanes = await import('./mongodb/capitanesMongo.dao.js');
        Capitanes = Capitanes.CapitanesMongoDAO;
        Dias = await import('./mongodb/diasMongo.dao.js');
        Dias = Dias.DiasMongoDAO;
        Remolcadores = await import('./mongodb/remolcadoresMongo.dao.js');
        Remolcadores = Remolcadores.RemolcadoresMongoDAO;
        Marineros = await import('./mongodb/marinerosMongo.dao.js');
        Marineros = Marineros.MarinerosMongoDAO;
        Solicitantes = await import('./mongodb/solicitantesMongo.dao.js');
        Solicitantes = Solicitantes.SolicitantesMongoDAO;
}

let Partes, Maniobras, Buques, Banderas, Capitanes, Dias, Remolcadores, Marineros, Solicitantes;
switch (config.PERSISTENCE) {
    case 'mongodb':
        await mongodbPersistence();
        break;
    default:
        throw new Error("Invalid persistence type");
}

export { Partes, Maniobras };