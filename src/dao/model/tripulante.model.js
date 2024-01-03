import mongoose from "mongoose";

const tripulanteCollection = "tripulante";
const tripulanteSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cod_tripulante: { type: String, required: true, unique: true },
});

tripulanteSchema.pre("save", async function (next) {
    let tripulante = this;
    let lastTripulante = await tripulanteModel.findOne({}, {}, { sort: { 'cod_tripulante': -1 } });
    tripulante.cod_tripulante = lastTripulante ? lastTripulante.cod_tripulante + 1 : 1;
    next();
});

export const tripulanteModel = mongoose.model(tripulanteCollection, tripulanteSchema);