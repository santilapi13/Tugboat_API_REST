import mongoose from "mongoose";

const parteCollection = "parte";
const parteSchema = new mongoose.Schema({
    remolcador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "remolcador",
        required: true,
    },
    buque: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buque",
        required: true,
    },
    maniobra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "maniobra",
        required: true,
    },
    hora_inicio: { type: Date, required: true },
    hora_fin: { type: Date, required: true },
    solicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "solicitante",
        required: true,
    },
    bandera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bandera",
        required: true,
    },
    observaciones: { type: String },
    practico: { type: String },
    otra_embarcacion: { type: String },
    confirmado: { type: Boolean, default: false },
    facturado: { type: Boolean, default: false },
    cod_parte: { type: Number, required: true, unique: true },
});

parteSchema.pre('save', async function(next) {
    let parte = this;
    let lastParte = await parteModel.findOne({}, {}, { sort: { 'cod_parte': -1 } });
    parte.cod_parte = lastParte ? lastParte.cod_parte + 1 : 1;
    next();
});

parteSchema.pre('find', function() {
    this.populate('remolcador');
    this.populate('buque');
    this.populate('maniobra');
    this.populate('solicitante');
    this.populate('bandera');
})

parteSchema.pre('findOne', function() {
    this.populate('remolcador');
    this.populate('buque');
    this.populate('maniobra');
    this.populate('solicitante');
    this.populate('bandera');
})

export const parteModel = mongoose.model(parteCollection, parteSchema);