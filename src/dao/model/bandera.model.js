import mongoose from "mongoose";

const banderaCollection = "bandera";
const banderaSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_bandera: { type: String, required: true, unique: true },
});

export const banderaModel = mongoose.model(banderaCollection, banderaSchema);