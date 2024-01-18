import mongoose from "mongoose";

const diaCollection = "dia";
const diaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    remolcador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "remolcador",
        required: true
    },
    partes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "parte",
    }],
    tripulacion: [{
        tripulante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tripulante",
        },
        cargo: { 
            type: String,
            enum: ['Patrón', 'Maquinista', 'Engrasador', 'Marinero'],
            required: true
        },
    }],
    feriado: { type: Boolean, required: true }
});

diaSchema.pre('find', function() {
    this.populate('partes');
    this.populate('remolcador');
    this.populate({
        path: 'tripulacion.tripulante'
    });
});

diaSchema.pre('findOne', function() {
    this.populate('partes');
    this.populate('remolcador');
    this.populate({
        path: 'tripulacion.tripulante'
    })
});

diaSchema.index({ fecha: 1 });

diaSchema.statics.findByFecha = function (year, month, day, remolcador) {
    const startOfDay = new Date(Date.UTC(year, month, day));
    const endOfDay = new Date(Date.UTC(year, month, day + 1));

    const query = { fecha: { $gte: startOfDay, $lt: endOfDay } };

    if (remolcador) query.remolcador = remolcador;

    return this.find(query);
};

export const diaModel = mongoose.model(diaCollection, diaSchema);
