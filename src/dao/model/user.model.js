import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export const usersModel = mongoose.model(userCollection, userSchema);