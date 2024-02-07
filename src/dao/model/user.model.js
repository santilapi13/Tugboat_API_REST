import mongoose from 'mongoose'

const userCollection = "user";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["ADMIN", "CAPITAN", "SUPERVISOR", "CONTADOR"],
    },
});

export const usersModel = mongoose.model(userCollection, userSchema);