import { remolcadoresService } from "../../services/remolcadores.service.js";
import { buquesService } from "../../services/buques.service.js";
import { maniobrasService } from "../../services/maniobras.service.js";
import { solicitantesService } from "../../services/solicitantes.service.js";
import { banderasService } from "../../services/banderas.service.js";

export default class ParteDTO {
    constructor(parte) {
        const validation = this.validatePropertiesKeys(parte);
        if (!validation.isValid)
            throw new Error("Parte properties are not valid: " + validation.message);
        
        this.remolcador = parte.remolcador;
        this.buque = parte.buque;
        this.maniobra = parte.maniobra;
        this.hora_inicio = new Date(parte.hora_inicio);
        this.hora_fin = new Date(parte.hora_fin);
        this.solicitante = parte.solicitante;
        this.bandera = parte.bandera;
        this.observaciones = parte.observaciones;
        this.practico = parte.practico;
        this.otra_embarcacion = parte.otra_embarcacion;
    }

    validatePropertiesKeys = (parte) => {
        let newParteProps = Object.keys(parte);
        let validator = ['remolcador', 'buque', 'maniobra', 'hora_inicio', 'hora_fin', 'solicitante', 'bandera'];
        
        for (const toValidateProp of validator) {
            if (!newParteProps.includes(toValidateProp))
            return {
                isValid: false,
                message: `Property ${toValidateProp} is missing.`
            };
        }

        if (new Date(parte.hora_inicio) == 'Invalid Date') 
            return {
                isValid: false,
                message: `Property hora_inicio ${parte.hora_inicio} is an invalid Date.`
            };

        if (new Date(parte.hora_fin) == 'Invalid Date')
            return {
                isValid: false,
                message: `Property hora_fin ${parte.hora_fin} is an invalid Date.`
            };
        
        return { isValid: true };
    }

    async validatePropertiesValues() {
        let remolcador = await remolcadoresService.getRemolcadores({ cod_remolcador: this.remolcador });
        if (!remolcador) throw new Error("Remolcador not found.");

        let buque = await buquesService.getBuques({ cod_buque: this.buque });
        if (!buque) throw new Error("Buque not found.");

        let maniobra = await maniobrasService.getManiobras({ cod_maniobra: this.maniobra });
        if (!maniobra) throw new Error("Maniobra not found.");

        let solicitante = await solicitantesService.getSolicitantes({ cod_solicitante: this.solicitante });
        if (!solicitante) throw new Error("Solicitante not found.");

        let bandera = await banderasService.getBanderas({ cod_bandera: this.bandera });
        if (!bandera) throw new Error("Bandera not found.");
    }
}