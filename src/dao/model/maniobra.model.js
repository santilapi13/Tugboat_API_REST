import mongoose from "mongoose";

const maniobraCollection = "maniobra";
const maniobraSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_maniobra: { type: String, required: true, unique: true },
});

maniobraSchema.pre("save", async function (next) {
    let maniobra = this;
    let lastManiobra = await maniobraModel.findOne({}, {}, { sort: { 'cod_maniobra': -1 } });
    maniobra.cod_maniobra = lastManiobra ? lastManiobra.cod_maniobra + 1 : 1;
    next();
});

export const maniobraModel = mongoose.model(maniobraCollection, maniobraSchema);