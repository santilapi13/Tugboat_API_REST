import mongoose from "mongoose";

const banderaCollection = "bandera";
const banderaSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_bandera: { type: String, required: true, unique: true },
});

banderaSchema.pre("save", async function (next) {
    let bandera = this;
    let lastBandera = await banderaModel.findOne({}, {}, { sort: { 'cod_bandera': -1 } });
    bandera.cod_bandera = lastBandera ? lastBandera.cod_bandera + 1 : 1;
    next();
});

export const banderaModel = mongoose.model(banderaCollection, banderaSchema);