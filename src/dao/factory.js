import { config } from '../config/dotenv.config.js';

const mongodbPersistence = async function() {
    console.log("Persistencia elegida: mongoDB")
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
    Tripulantes = await import('./mongodb/tripulantesMongo.dao.js');
    Tripulantes = Tripulantes.TripulantesMongoDAO;
    Solicitantes = await import('./mongodb/solicitantesMongo.dao.js');
    Solicitantes = Solicitantes.SolicitantesMongoDAO;
    Users = await import('./mongodb/usersMongo.dao.js');
    Users = Users.UsersMongoDAO;
}

let Partes, Maniobras, Buques, Banderas, Capitanes, Dias, Remolcadores, Tripulantes, Solicitantes, Users;
switch (config.PERSISTENCE) {
    case 'mongodb':
        await mongodbPersistence();
        break;

    default:
        throw new Error("Invalid persistence type");
}

export { Partes, Maniobras, Buques, Banderas, Capitanes, Dias, Remolcadores, Tripulantes, Solicitantes, Users };