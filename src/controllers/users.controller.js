import { usersService } from '../services/users.service.js';

async function getUsers(req, res) {
    let result;

    try {
        result = await usersService.getUsers();
    } catch (error) {
        req.logger.error(`Error fetching all users: ${error.message}`);
        return res.sendInternalServerError(error.message);
    }

    res.sendOk(result);
}

async function getUserById(req, res) {
    let result;
    const { uid } = req.params;

    try {
        result = await usersService.getUsers({ uid });
    } catch (error) {
        req.logger.error(`Error fetching user with ID ${uid}: ${error.message}`);
        return res.sendInternalServerError(error.message);
    }

    if (!result)
        return res.sendNotFoundError(`User with code ${uid} not found.`);

    res.sendOk(result);
}

async function deleteUser(req, res) {
    const { uid } = req.params;
    let result;

    try {
        const user = await usersService.getUsers({ uid });
        if (!user)
            return res.sendNotFoundError(`User with id ${uid} not found.`);
    } catch (error) {
        req.logger.error(`Error fetching user with ID ${uid}: ${error.message}`);
        return res.sendInternalServerError(error.message);
    }

    try {
        result = await usersService.deleteUser(uid);
    } catch (error) {
        req.logger.error(`Error deleting user with ID ${uid}: ${error.message}`);
        return res.sendInternalServerError(error.message);
    }

    res.sendOk(result);
}

export default { getUsers, getUserById, deleteUser };