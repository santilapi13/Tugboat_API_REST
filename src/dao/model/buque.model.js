import mongoose from "mongoose";

const buqueCollection = "buque";
const buqueSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_buque: { type: String, required: true, unique: true },
});

export const buqueModel = mongoose.model(buqueCollection, buqueSchema);