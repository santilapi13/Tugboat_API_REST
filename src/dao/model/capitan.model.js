import mongoose from "mongoose";

const capitanCollection = "capitan";
const capitanSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cod_capitan: { type: String, required: true, unique: true },
});

capitanSchema.pre("save", async function (next) {
    let capitan = this;
    let lastCapitan = await capitanModel.findOne({}, {}, { sort: { 'cod_capitan': -1 } });
    capitan.cod_capitan = lastCapitan ? lastCapitan.cod_capitan + 1 : 1;
    next();
});

export const capitanModel = mongoose.model(capitanCollection, capitanSchema);