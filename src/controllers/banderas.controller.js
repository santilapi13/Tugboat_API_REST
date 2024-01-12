import { banderasService } from "../services/banderas.service.js";

async function getBanderas(req, res) {
    try {
        const banderas = await banderasService.getBanderas();
        res.sendOk(banderas);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function getBanderaByCode(req, res) {
    const { cod_bandera } = req.params;

    try {
        const bandera = await banderasService.getBanderas({ cod_bandera });
        res.sendOk(bandera);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

async function postBanderas(req, res) {
    const { title } = req.body;

    try {
        const bandera = await banderasService.createBandera({ title });
        res.sendCreated(bandera);
    } catch (error) {
        res.sendBadRequestError(error.message);
    }
}

export default { getBanderas, getBanderaByCode, postBanderas };