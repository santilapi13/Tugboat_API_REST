import passport from 'passport';
import local from 'passport-local'
import jwt from "passport-jwt";
import { usersService } from '../services/users.service.js';
import { config } from './dotenv.config.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const PRIVATE_KEY = config.PRIVATE_KEY;

const cookieExtractor = req => {
	let token = null;
	if (req && req.cookies && req.cookies.authToken)
		token = req.cookies.authToken;

	return token;
}

export const initializePassport = () => {
    passport.use('signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            const user = await usersService.getUserByUsername(username);
            if (user) {
                return done(null, false, { message: 'User already exists' });
            }
        } catch (error) {
            return done(error);
        }

        try {
            const { role } = req.body;  

            const user = await usersService.createUser({ username, password, role });
            user.password = undefined;
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await usersService.getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);
            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }

            user.password = undefined;
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }));

    passport.use(new JWTStrategy({
        secretOrKey: PRIVATE_KEY,
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }));
}
