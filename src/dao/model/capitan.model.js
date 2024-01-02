import mongoose from "mongoose";

const capitanCollection = "capitan";
const capitanSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
});

export const capitanModel = mongoose.model(capitanCollection, capitanSchema);