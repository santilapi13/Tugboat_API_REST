import mongoose from "mongoose";

const maniobraCollection = "maniobra";
const maniobraSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
});

export const maniobraModel = mongoose.model(maniobraCollection, maniobraSchema);