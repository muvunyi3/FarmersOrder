import { Pool } from 'pg';

//const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "farmersdb"
});

module.exports = pool;
//export default pool;
