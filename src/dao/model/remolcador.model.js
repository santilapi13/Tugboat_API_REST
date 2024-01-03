import mongoose from "mongoose";

const remolcadorCollection = "remolcador";
const remolcadorSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_remolcador: { type: String, required: true, unique: true },
});

remolcadorSchema.pre("save", async function (next) {
    let remolcador = this;
    let lastRemolcador = await remolcadorModel.findOne({}, {}, { sort: { 'cod_remolcador': -1 } });
    remolcador.cod_remolcador = lastRemolcador ? lastRemolcador.cod_remolcador + 1 : 1;
    next();
});

export const remolcadorModel = mongoose.model(remolcadorCollection, remolcadorSchema);