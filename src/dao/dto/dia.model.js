export default class DiaDTO {
    constructor(dia) {
        if (!this.validateProps(dia))
            throw new Error("Dia properties are not valid.");

        this.fecha = dia.fecha;
        this.partes = dia.partes;
        this.tripulacion = dia.tripulacion;
        this.feriado = dia.feriado;
    }

    validateProps = (dia) => {
        let newDiaProps = Objects.keys(dia);
        let validator = ['fecha', 'partes', 'tripulacion', 'cargo', 'feriado'];
        let admitedCargos = ['Patrón', 'Maquinista', 'Engrasador', 'Marinero'];
        let tripulacionValidator = ['tripulante', 'cargo']; 

        for (const toValidateProp of validator) {
            if (!newDiaProps.includes(toValidateProp))
                return false;
        }

        for (const toValidateProp of tripulacionValidator) {
            if (!newDiaProps.includes(toValidateProp))
                return false;
        }

        if (!admitedCargos.includes(dia.tripulacion.cargo))
            return false;

        return true;
    }
}