// @ts-nocheck
require('dotenv').config()
const pool = require('./lib/database');
const {db} = require('./lib/firestore')

const docRef = db.collection('test').doc('data');
const netRef = db.collection('test').doc('network');
const activeRef = db.collection('test').doc('active');

async function getblocktimeMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m') as x,count(*)as y FROM explorepi.Account where Role = 'Pioneer' group by DATE_FORMAT(created_at, '%Y-%m') order by x;`)
  result = await JSON.parse(JSON.stringify(result))
  docRef.update({'accountCreation':result})
}
getblocktimeMonth()
