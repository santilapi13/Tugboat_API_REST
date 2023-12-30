import mongoose from "mongoose";

const maniobraCollection = "maniobra";
const maniobraSchema = new mongoose.Schema({
    // TODO: Definir el schema
});

export const maniobraModel = mongoose.model(maniobraCollection, maniobraSchema);