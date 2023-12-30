import dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

export const config = {
    MODE : process.env.MODE,
    PORT : process.env.PORT,
    PERSISTENCE : process.env.PERSISTENCE,
    DB_URL : process.env.DB_URL
}