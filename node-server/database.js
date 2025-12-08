const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "Legoauto2005",
    database: "testWAD",
    host: "localhost",
    port: "5432"
});

async function execute(query) {
    try {
        await pool.connect();
        await pool.query(query);
        return true;
    } catch(err) {
        console.error(err.stack);
        return false;
    }
}
//DROP TABLE IF EXISTS "posts";
execute(` 
    CREATE TABLE IF NOT EXISTS "posts" (
	    "id" SERIAL PRIMARY KEY,
	    "body" VARCHAR(200) NOT NULL,
        "creation_time" VARCHAR(200) NOT NULL
    );`
).then(result => {
    if (result) {
        console.log("Recreated the table.");
    }
})

module.exports = pool;