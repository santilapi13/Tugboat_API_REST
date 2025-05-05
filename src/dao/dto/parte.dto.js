import { remolcadoresService, buquesService, maniobrasService, solicitantesService, banderasService } from "../../services/services.js";

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
        let remolcador = await remolcadoresService.get({ cod_remolcador: this.remolcador });
        if (!remolcador) throw new Error(`Couldn't update parte: remolcador with cod_remolcador ${this.remolcador} not found.`);

        let buque = await buquesService.get({ cod_buque: this.buque });
        if (!buque) throw new Error(`Couldn't update parte: buque with cod_buque ${this.buque} not found.`);

        let maniobra = await maniobrasService.get({ cod_maniobra: this.maniobra });
        if (!maniobra) throw new Error(`Couldn't update parte: maniobra with cod_maniobra ${this.maniobra} not found.`);

        let solicitante = await solicitantesService.get({ cod_solicitante: this.solicitante });
        if (!solicitante) throw new Error(`Couldn't update parte: solicitante with cod_solicitante ${this.solicitante} not found.`);

        let bandera = await banderasService.get({ cod_bandera: this.bandera });
        if (!bandera) throw new Error(`Couldn't update parte: bandera with cod_bandera ${this.bandera} not found.`);
    }
}