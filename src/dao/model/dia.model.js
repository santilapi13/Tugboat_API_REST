import mongoose from "mongoose";

const diaCollection = "dia";
const diaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true, unique: true },
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
    this.populate({
        path: 'tripulacion.tripulante'
    })
});

diaSchema.pre('findOne', function() {
    this.populate('partes');
    this.populate({
        path: 'tripulacion.tripulante'
    })
});

diaSchema.index({ fecha: 1 });

diaSchema.statics.findByFecha = function (year, month, day) {
    const startOfDay = new Date(year, month, day);
    const endOfDay = new Date(year, month, day + 1);

    return this.findOne({
        fecha: { $gte: startOfDay, $lt: endOfDay }
    });
};

export const diaModel = mongoose.model(diaCollection, diaSchema);
