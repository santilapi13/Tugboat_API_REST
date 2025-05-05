import { config } from '../config/dotenv.config.js';

const mongodbPersistence = async function() {
    console.log("Persistencia elegida: mongoDB")
    Partes = await import('./mongodb/partesMongo.dao.js');
    Partes = Partes.PartesMongoDAO;
    Maniobras = await import('./mongodb/mongoDao.js');
    Maniobras = Maniobras.maniobrasMongoDAO;
    Buques = await import('./mongodb/mongoDao.js');
    Buques = Buques.buquesMongoDAO;
    Banderas = await import('./mongodb/mongoDao.js');
    Banderas = Banderas.banderasMongoDAO;
    Capitanes = await import('./mongodb/mongoDao.js');
    Capitanes = Capitanes.capitanesMongoDAO;
    Dias = await import('./mongodb/diasMongo.dao.js');
    Dias = Dias.DiasMongoDAO;
    Remolcadores = await import('./mongodb/mongoDao.js');
    Remolcadores = Remolcadores.remolcadoresMongoDAO;
    Tripulantes = await import('./mongodb/mongoDao.js');
    Tripulantes = Tripulantes.tripulantesMongoDAO;
    Solicitantes = await import('./mongodb/mongoDao.js');
    Solicitantes = Solicitantes.solicitantesMongoDAO;
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