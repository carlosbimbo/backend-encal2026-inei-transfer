import dotenv from "dotenv"

dotenv.config()

const configbd = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,      
    connectionTimeout: 9000000,
    requestTimeout: 9000000,
    options: {
        trustedconnection: false,
        enableArithAbort: true,
        encrypt: false
    },
    pool: {           
        idleTimeoutMillis: 9000000,
        max: 100
    }
}

//module.exports = configbd;
export default configbd;
