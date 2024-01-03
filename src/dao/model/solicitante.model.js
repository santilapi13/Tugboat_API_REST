import mongoose from "mongoose";

const solicitanteCollection = "solicitante";
const solicitanteSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_solicitante: { type: String, required: true, unique: true },
});

solicitanteSchema.pre("save", async function (next) {
    let solicitante = this;
    let lastSolicitante = await solicitanteModel.findOne({}, {}, { sort: { 'cod_solicitante': -1 } });
    solicitante.cod_solicitante = lastSolicitante ? lastSolicitante.cod_solicitante + 1 : 1;
    next();
});

export const solicitanteModel = mongoose.model(solicitanteCollection, solicitanteSchema);