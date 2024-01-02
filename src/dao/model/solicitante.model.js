import mongoose from "mongoose";

const solicitanteCollection = "solicitante";
const solicitanteSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
});

export const solicitanteModel = mongoose.model(solicitanteCollection, solicitanteSchema);