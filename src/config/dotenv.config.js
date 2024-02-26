import dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

export const config = {
    MODE : process.env.MODE,
    PORT : process.env.PORT,
    PERSISTENCE : process.env.PERSISTENCE,
    DEVELOPMENT_DB_URL : process.env.DEVELOPMENT_DB_URL,
    PRIVATE_KEY : process.env.PRIVATE_KEY
}

console.log('Mode variable: ', config.MODE);
console.log('Port variable: ', config.PORT);