import { remolcadoresService } from "../../services/remolcadores.service.js";
import { buquesService } from "../../services/buques.service.js";
import { maniobrasService } from "../../services/maniobras.service.js";
import { solicitantesService } from "../../services/solicitantes.service.js";
import { banderasService } from "../../services/banderas.service.js";

export default class ParteDTO {
    constructor(parte) {
        if (!this.validatePropertiesKeys(parte))
            throw new Error("Parte properties are not valid.");
        
        this.remolcador = parte.remolcador;
        this.buque = parte.buque;
        this.maniobra = parte.maniobra;
        this.hora_inicio = parte.hora_inicio;
        this.hora_fin = parte.hora_fin;
        this.solicitante = parte.solicitante;
        this.bandera = parte.bandera;
        this.observaciones = parte.observaciones;
        this.practico = parte.practico;
        this.otra_embarcacion = parte.otra_embarcacion;
    }

    validatePropertiesKeys = (parte) => {
        let newParteProps = Objects.keys(parte);
        let validator = ['remolcador', 'buque', 'maniobra', 'hora_inicio', 'hora_fin', 'solicitante', 'bandera'];
        
        for (const toValidateProp of validator) {
            if (!newParteProps.includes(toValidateProp))
                return false;
        }
        
        return true;
    }

    async validatePropertiesValues() {
        let remolcador = await remolcadoresService.getRemolcadores({ cod_remolcador: this.remolcador });
        if (!remolcador) throw new Error("Remolcador not found.");
        this.remolcador = remolcador._id;

        let buque = await buquesService.getBuques({ cod_buque: this.buque });
        if (!buque) throw new Error("Buque not found.");
        this.buque = buque._id;

        let maniobra = await maniobrasService.getManiobras({ cod_maniobra: this.maniobra });
        if (!maniobra) throw new Error("Maniobra not found.");
        this.maniobra = maniobra._id;

        let solicitante = await solicitantesService.getSolicitantes({ cod_solicitante: this.solicitante });
        if (!solicitante) throw new Error("Solicitante not found.");
        this.solicitante = solicitante._id;

        let bandera = await banderasService.getBanderas({ cod_bandera: this.bandera });
        if (!bandera) throw new Error("Bandera not found.");
        this.bandera = bandera._id;
    }
}