import mongoose from "mongoose";

const tripulanteCollection = "tripulante";
const tripulanteSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cod_tripulante: { type: String, required: true, unique: true },
});

export const tripulanteModel = mongoose.model(tripulanteCollection, tripulanteSchema);