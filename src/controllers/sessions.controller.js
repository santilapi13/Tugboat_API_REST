import { generateJWT } from '../utils.js';

async function signup(req, res) {
    res.sendOk(req.user);
}

async function login(req, res, next) {
    try {
        const user = req.user;
        let token = generateJWT(user);

        res.cookie('authToken', token, {
            maxAge:1000*60*60,
            httpOnly:true
        });

        res.sendOk(user);
    } catch (error) {
        res.sendInternalServerError(error.message);
    }
}

async function logout(req, res) {
    res.clearCookie('authToken');
    res.sendOk();
}

export default { signup, login, logout };