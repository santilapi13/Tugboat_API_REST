import mongoose from "mongoose";

const buqueCollection = "buque";
const buqueSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    cod_buque: { type: String, required: true, unique: true },
});

buqueSchema.pre("save", async function (next) {
    let buque = this;
    let lastBuque = await buqueModel.findOne({}, {}, { sort: { 'cod_buque': -1 } });
    buque.cod_buque = lastBuque ? lastBuque.cod_buque + 1 : 1;
    next();
});

export const buqueModel = mongoose.model(buqueCollection, buqueSchema);