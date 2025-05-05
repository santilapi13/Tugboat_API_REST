import { tripulantesService, remolcadoresService } from '../../services/services.js';
import { diasService } from '../../services/dias.service.js';

export default class DiaDTO {
    constructor(dia) {
        const validation = this.validateProps(dia);
        if (!validation.isValid)
            throw new Error(validation.message);

        this.fecha = new Date(dia.fecha);
        this.partes = dia.partes;
        this.tripulacion = dia.tripulacion;
        this.feriado = dia.feriado;
        this.cod_remolcador = dia.cod_remolcador;
    }

    validateProps = (dia) => {
        let newDiaProps = Object.keys(dia);
        let validator = ['fecha', 'partes', 'tripulacion', 'cargo', 'feriado', 'cod_remolcador'];
        let admitedCargos = ['Patrón', 'Maquinista', 'Engrasador', 'Marinero'];
        let tripulacionValidator = ['tripulante', 'cargo']; 

        if (!(typeof dia.feriado === 'boolean')) {
            return {
                isValid: false,
                message: `Dia properties are not valid: Property feriado should be a Boolean.`
            };
        }

        if (!dia.cod_remolcador) {
            return {
                isValid: false,
                message: `Dia properties are not valid: Property cod_remolcador is missing.`
            };
        }

        for (const toValidateProp of newDiaProps) {
            if (!validator.includes(toValidateProp))
                return {
                    isValid: false,
                    message: `Dia properties are not valid: ${toValidateProp} should not be in dia properties.`
                };
        }

        const fechaDate = new Date(dia.fecha);
        if (!(fechaDate instanceof Date)) {
            return {
                isValid: false,
                message: `Dia properties are not valid: Property fecha should be a Date.`
            };
        }

        if (!Array.isArray(dia.tripulacion))
            return {
                isValid: false,
                message: `Dia properties are not valid: Property tripulacion should be an Array.`
            };
        
        for (const tripulante of dia.tripulacion) {
            let tripulanteProps = Object.keys(tripulante);

            for (const toValidateProp of tripulanteProps) {
                if (!tripulacionValidator.includes(toValidateProp))
                    return {
                        isValid: false,
                        message: `Dia properties are not valid: ${toValidateProp} should not be in dia.tripulacion properties.`
                    };
            }

            if (!admitedCargos.includes(tripulante.cargo))
                return {
                    isValid: false,
                    message: `Dia properties are not valid: Property cargo should be one of ${admitedCargos}.`
                };
        }

        return { isValid: true };
    }

    validateReferences = async () => {
        let existingRemolcador = await remolcadoresService.get({ cod_remolcador: this.cod_remolcador });
        if (!existingRemolcador[0]) throw new Error(`cod_remolcador ${this.cod_remolcador} not found.`);

        for (let i = 0; i < this.tripulacion.length; i++) {
            try {
                let existingTripulante = await tripulantesService.get({ cod_tripulante: this.tripulacion[i].tripulante });
                if (!existingTripulante[0]) throw new Error(`cod_tripulante ${this.tripulacion[i].tripulante} not found.`);
            } catch (error) {
                throw new Error(`Dia properties are not valid: ${error}`);
            }
        }
    }

    validateUnique = async () => {
        let dias = await diasService.getDias({ fecha: this.fecha, remolcador: this.cod_remolcador });
        let alreadyExists = dias[0];
        if (alreadyExists) throw new Error(`Dia properties are not valid: Dia with fecha ${this.fecha} already exists for remolcador ${this.cod_remolcador}.`);

        let lastDia = await diasService.getDias({}, { sort: { 'fecha': -1 }, limit: 1 });
        let lastDiaDate = lastDia[0].fecha;
        if (lastDiaDate.getFullYear() > this.fecha.getFullYear() || lastDiaDate.getMonth() > this.fecha.getMonth() || lastDiaDate.getDate() > this.fecha.getDate())
            throw new Error(`Dia properties are not valid: Provided fecha must be equal or after last loaded fecha in database: ${lastDiaDate}.`);
    }
}