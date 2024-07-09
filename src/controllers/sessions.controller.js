import { generateJWT } from '../utils.js';

async function signup(req, res) {
    res.sendOk(req.user);
}

async function login(req, res, next) {
    try {
        const user = req.user;
        let token = generateJWT(user);
        const maxAge = 1000*60*60*3;

        res.cookie('authToken', token, {
            maxAge: maxAge,
            httpOnly:true
        });
        
        const result = {
            username: user.username,
            role: user.role,
            maxAge: maxAge
        }

        res.sendOk(result);
    } catch (error) {
        req.logger.error(`Error while logging in user ${req.user.username}: ${error.message}`);
        res.sendInternalServerError(error.message);
    }
}

async function logout(req, res) {
    res.clearCookie('authToken');
    res.sendOk();
}

export default { signup, login, logout };