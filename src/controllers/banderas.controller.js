import { banderasService } from "../services/banderas.service.js";

async function getBanderas(req, res) {
    let banderas;
    try {
        banderas = await banderasService.getBanderas();
        res.sendOk(banderas);
    } catch (error) {
        req.logger.error(`Error fetching all flags: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function getBanderaByCode(req, res) {
    const { cod_bandera } = req.params;
    let bandera;

    try {
        bandera = await banderasService.getBanderas({ cod_bandera });

        if (!bandera)
            return res.sendBadRequestError(`Flag with code ${cod_bandera} not found.`);

        res.sendOk(bandera);
    } catch (error) {
        req.logger.error(`Error fetching flag with code ${cod_bandera}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function postBanderas(req, res) {
    const { title } = req.body;

    try {
        const bandera = await banderasService.createBandera({ title });
        res.sendCreated(bandera);
    } catch (error) {
        req.logger.error(`Error creating flag named ${title}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

export default { getBanderas, getBanderaByCode, postBanderas };