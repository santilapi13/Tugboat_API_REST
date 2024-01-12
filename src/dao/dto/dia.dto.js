import { tripulantesService } from '../../services/tripulantes.service.js';

export default class DiaDTO {
    constructor(dia) {
        const validation = this.validateProps(dia);
        if (!validation.isValid)
            throw new Error(validation.message);

        this.fecha = dia.fecha;
        this.partes = dia.partes;
        this.tripulacion = dia.tripulacion;
        this.feriado = dia.feriado;
    }

    validateProps = (dia) => {
        let newDiaProps = Object.keys(dia);
        let validator = ['fecha', 'partes', 'tripulacion', 'cargo', 'feriado'];
        let admitedCargos = ['Patrón', 'Maquinista', 'Engrasador', 'Marinero'];
        let tripulacionValidator = ['tripulante', 'cargo']; 

        for (const toValidateProp of newDiaProps) {
            if (!validator.includes(toValidateProp))
                return {
                    isValid: false,
                    message: `Dia properties are not valid: ${toValidateProp} should not be in dia properties.`
                };
        }

        if (!(dia.fecha instanceof Date))
            return {
                isValid: false,
                message: `Dia properties are not valid: Property fecha should be a Date.`
            };

        if (!Array.isArray(dia.tripulacion))
            return {
                isValid: false,
                message: `Dia properties are not valid: Property tripulacion should be an Array.`
            };

        for (const tripulante of dia.tipulacion) {
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

            if (!(dia.feriado instanceof Boolean)) {
                return {
                    isValid: false,
                    message: `Dia properties are not valid: Property feriado should be a Boolean.`
                };
            }
        }

        return { isValid: true };
    }

    validateReferences = async () => {
        for (let i = 0; i < this.tripulacion.length; i++) {
            try {
                let existingTripulante = await tripulantesService.getTripulantes({ cod_tripulante: tripulacion[i].tripulante });
                if (!existingTripulante) throw new Error("Tripulante not found.");
                this.tripulacion[i] = existingTripulante._id;
            } catch (error) {
                throw new Error(`Dia properties are not valid: ${error.message}`);
            }
        }
    }
}