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
    this.populate('tripulacion');
});

diaSchema.pre('findOne', function() {
    this.populate('partes');
    this.populate('tripulacion');
});

export const diaModel = mongoose.model(diaCollection, diaSchema);
