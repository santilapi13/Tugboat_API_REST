import { partesService } from '../services/partes.service.js';
import ParteDTO from '../dao/dto/parte.dto.js';

async function getPartes(req, res) {
    try {
        const partes = await partesService.getPartes();
        return res.sendOk(partes);
    } catch (error) {
        return res.sendInternalServerError(error.message);
    }
}

async function postParte(req, res) {
    let { remolcador, buque, maniobra, hora_inicio, hora_fin, solicitante, bandera, observaciones, practico, otra_embarcacion } = req.body;
    let parte;

    try {
        parte = new ParteDTO({ remolcador, buque, maniobra, hora_inicio, hora_fin, solicitante, bandera, observaciones, practico, otra_embarcacion });
        await parte.validatePropertiesValues();
    } catch (error) {
        return res.sendBadRequestError(error.message);
    }

    let result = await partesService.createParte(parte);
    res.sendCreated(result);
}

export default { getPartes, postParte };