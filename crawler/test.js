// @ts-nocheck
require('dotenv').config()
const pool = require('./lib/database');

async function getblocktimeMonth(){
    let result = await pool.query(`SELECT * FROM explorepi.metadata;`)
  result = await JSON.parse(JSON.stringify(result))
 console.log(result)
}
getblocktimeMonth()
