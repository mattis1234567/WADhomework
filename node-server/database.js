const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    database: "testWAD",
    host: "localhost",
    port: "5432"
});

const execute = async (query) => {
    try {
        await pool.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTables = async () => {
    await execute(`
        CREATE TABLE IF NOT EXISTS "users" (
            id SERIAL PRIMARY KEY,
            email VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL
        );`
    );

    await execute(`
        CREATE TABLE IF NOT EXISTS "posts" (
            "id" SERIAL PRIMARY KEY,
            "body" VARCHAR(200) NOT NULL,
            "creation_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    );
    console.log("Tables created/verified.");
};

createTables();

module.exports = pool;