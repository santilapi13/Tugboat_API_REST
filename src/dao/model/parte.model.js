import mongoose from "mongoose";

const parteCollection = "parte";
const parteSchema = new mongoose.Schema({
    // TODO: Definir el schema
});

export const parteModel = mongoose.model(parteCollection, parteSchema);