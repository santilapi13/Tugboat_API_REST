import mongoose from "mongoose";
import { usersModel } from "./model/user.model.js";

export class UsersMongoDAO {
    constructor() {
    }

    async get(filter = {}) {
        if (filter.uid) {
            filter._id = filter.uid;
            delete filter.uid;
        }

        let result = await usersModel.find(filter);
        return result.length === 0 ? null : result;
    }

    async create(user) {
        return await usersModel.create(user);
    }

    async delete(id) {
        return await usersModel.deleteOne({ _id: id });
    }
}