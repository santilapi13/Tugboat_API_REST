export default class ParteDTO {
    constructor(parte) {
        if (!this.validateProps(parte))
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

    validateProps = (parte) => {
        let newParteProps = Objects.keys(parte);
        let validator = ['remolcador', 'buque', 'maniobra', 'hora_inicio', 'hora_fin', 'solicitante', 'bandera'];
        
        for (const toValidateProp of validator) {
            if (!newParteProps.includes(toValidateProp))
                return false;
        }
        
        return true;
    }
}