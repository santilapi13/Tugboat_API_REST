import mongoose from "mongoose";

const remolcadorCollection = "remolcador";
const remolcadorSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
});

export const remolcadorModel = mongoose.model(remolcadorCollection, remolcadorSchema);