const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "minaeff12",
	host: "localhost",
	port: 5432,
	database: "sqlinjection",
});

module.exports = pool;
