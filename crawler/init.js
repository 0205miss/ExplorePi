// @ts-nocheck
require('dotenv').config()
const pool = require('./lib/database');
const {db} = require('./lib/firestore')
const schedule = require('node-schedule');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const docRef = db.collection('statistic').doc('data');
const netRef = db.collection('statistic').doc('network');
const activeRef = db.collection('statistic').doc('active');
async function getTop10(){
    let result = await pool.query(`SELECT account,(org.balance-totalfee.total) as balance 
FROM (SELECT * from explorepi.Account where Role <> 'CoreTeam' OR Role is null order by balance desc LIMIT 0, 50) as org
    JOIN (SELECT sum(amount) as total,account FROM explorepi.fee where account in (SELECT * FROM (SELECT public_key from explorepi.Account where Role <> 'CoreTeam' OR Role is null order by balance desc LIMIT 0, 50) as t) group by account order by total desc) as totalfee ON  org.public_key = totalfee.account
    order by balance desc LIMIT 0, 10`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'top10':result},{merge:true})
}
async function getblocktime(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as x,avg(spend) as y,sum(operation) as op FROM explorepi.block where created_at >= now() - interval 31 day group by DATE_FORMAT(created_at, '%Y-%m-%d') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'blocktime':result},{merge:true})
}
async function getblocktimeMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m') as x,avg(spend) as y,sum(operation) as op FROM explorepi.block group by DATE_FORMAT(created_at, '%Y-%m') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'blocktimeMonth':result},{merge:true})
}
async function getTop10payment(){
    let result = await pool.query(`SELECT count(*) as count,account FROM explorepi.operation where type_i=1 group by account order by count desc LIMIT 0, 10;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'top10payment':result},{merge:true})
}
async function getTop10fee(){
    let result = await pool.query(`SELECT sum(amount) as total,account FROM explorepi.fee group by account order by total desc LIMIT 0, 10;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'top10fee':result},{merge:true})
}
async function getopdistribute(){
    let result = await pool.query(`SELECT count(*) as total,type_i as op FROM explorepi.operation group by type_i;`)
    docRef.set({'opdistribute':result},{merge:true})
}
async function getclaimed(){
    let result = await pool.query(`SELECT DATE_FORMAT(claimed_at, '%Y-%m-%d') as x,count(*) as y FROM explorepi.claimant where claimed_at is not null and status=1 and created_at >= now() - interval 31 day group by DATE_FORMAT(claimed_at, '%Y-%m-%d') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'claimed':result},{merge:true})
}
async function getclaimedback(){
    let result = await pool.query(`SELECT DATE_FORMAT(claimed_at, '%Y-%m-%d') as x,count(*) as y FROM explorepi.claimant where claimed_at is not null and status=2 and created_at >= now() - interval 31 day group by DATE_FORMAT(claimed_at, '%Y-%m-%d') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'claimedback':result},{merge:true})
}
async function getclaimanthistory(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as x,count(*) as y FROM explorepi.claimant where created_at >= now() - interval 31 day group by DATE_FORMAT(created_at, '%Y-%m-%d') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'createclaimant':result},{merge:true})
}
async function getclaimedMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(claimed_at, '%Y-%m') as x,count(*) as y,sum(amount) as z FROM explorepi.claimant where claimed_at is not null and status=1 group by DATE_FORMAT(claimed_at, '%Y-%m') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'claimedMonth':result},{merge:true})
}
async function getclaimedbackMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(claimed_at, '%Y-%m') as x,count(*) as y FROM explorepi.claimant where claimed_at is not null and status=2 group by DATE_FORMAT(claimed_at, '%Y-%m') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'claimedbackMonth':result},{merge:true})
}
async function getclaimanthistoryMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m') as x,count(*) as y,sum(amount) as z FROM explorepi.claimant group by DATE_FORMAT(created_at, '%Y-%m') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'createclaimantMonth':result},{merge:true})
}

async function getlockupperiod(){
    let result = await pool.query(`SELECT count(case when a.period=1209600 then 1 else null end) as no_lock, count(case when a.period>1209600 and a.period<=2419200 then 1 else null end) as twoweek, count(case when a.period>2419200 and a.period<=18187200 then 1 else null end) as sixmonths, count(case when a.period>18187200 and a.period<=33976800 then 1 else null end) as oneyear, count(case when a.period>33976800 then 1 else null end) as threeyear from(SELECT account,max(lock_time) as period FROM explorepi.claimant group by account) as a`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'lockuptime':result},{merge:true})
}
async function getmetric(){
    let result = await pool.query(`SELECT a.a as TotalAccount,b.a as TotalPi,c.a as TotalClaim,b.a-c.a as TotalLock,d.a as TotalPioneer from(SELECT count(*) as a FROM explorepi.Account)as a,(SELECT sum(amount) as a FROM explorepi.claimant where status<>2 and ct_create=1) as b,(SELECT sum(amount) as a FROM explorepi.claimant where status=1 and ct_create=1)as c,(SELECT count(distinct account) as a FROM explorepi.claimant)as d`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'metric':result[0]},{merge:true})
}
async function getdailymetric(){
    let active = await pool.query(`select count(a.account) as dailyactive from(SELECT account FROM explorepi.operation where created_at >= now() - interval 24 hour group by account) as a`)
    active = await JSON.parse(JSON.stringify(active))
    let fee = await pool.query(`SELECT sum(amount) as a FROM explorepi.fee where created_at >= now() - interval 24 hour`)
    fee = await JSON.parse(JSON.stringify(fee))
    let pay = await pool.query(`SELECT count(*) as dailypayment,sum(amount) as dailypipay FROM explorepi.operation where created_at >= now() - interval 24 hour and type_i=1`)
    pay = await JSON.parse(JSON.stringify(pay))
    let op = await pool.query(`SELECT count(*) as a FROM explorepi.operation where created_at >= now() - interval 24 hour`)
    op = await JSON.parse(JSON.stringify(op))
    let avg_time = await pool.query(`SELECT avg(spend) as a,sum(success) as b,sum(operation) as c,count(id) as d FROM explorepi.block where created_at >= now() - interval 24 hour`)
    avg_time = await JSON.parse(JSON.stringify(avg_time))
    let result ={
        active:active[0].dailyactive,
        fee:fee[0].a,
        pay:pay[0].dailypayment,
        payamount:pay[0].dailypipay,
        op:op[0].a,
        block_time:avg_time[0].a,
        tps:avg_time[0].b,
        ops:avg_time[0].c,
        total_block:avg_time[0].d,
    }
    docRef.set({'daily':result},{merge:true})
}
async function getunlocknotclaimed(){
    let result = await pool.query(`SELECT sum(amount) as a FROM explorepi.claimant where unlock_time < now() and status = 0`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'unlocknotclaimed':result[0].a},{merge:true})
}
async function getavailablepi(){
    let result = await pool.query(`SELECT (a.a - b.a) AS a FROM (SELECT SUM(balance) AS a FROM explorepi.Account )AS a,(SELECT SUM(amount) AS a FROM explorepi.fee AS b)AS b`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'availablepi':result[0].a},{merge:true})
}
async function getfutureunlock(){
    let result = await pool.query(`SELECT DATE_FORMAT(unlock_time, '%Y-%m-%d') as x,count(*) as y,sum(amount) as amount FROM explorepi.claimant where unlock_time > now() group by DATE_FORMAT(unlock_time, '%Y-%m-%d') order by x asc`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'futureUnlock':result},{merge:true})
}
async function getfutureunlockMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(unlock_time, '%Y-%m') as x,count(*) as y,sum(amount) as amount FROM explorepi.claimant where unlock_time > now() group by DATE_FORMAT(unlock_time, '%Y-%m') order by x asc`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'futureUnlockMonth':result},{merge:true})
}
async function getoneyearunclaimed(){
    let result = await pool.query(`SELECT sum(amount) as a FROM explorepi.claimant where status = 0 and unlock_time< date_sub(now(),INTERVAL 1 YEAR)`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'oneyearunclaimed':result[0].a},{merge:true})
}
async function getholderrank(){
    let result = await pool.query("select case when balance >= 0 and balance <= 1 then '0' when balance > 1 and balance <= 10 then '1' when balance > 10 and balance <= 100 then '2' when balance > 100 and balance <= 500 then '3' when balance > 500 and balance <= 1000 then '4' when balance > 1000 and balance <= 5000 then '5' when balance > 5000 and balance <= 10000 then '6' when balance > 10000 and balance <= 100000 then '7' when balance > 100000 and balance <= 1000000 then '8' else '9' end as 'range', count(*) as `result` from Account where Role = 'Pioneer' group by `range` order by `range`")
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'rank':result},{merge:true})
}
async function getactive(){
    let result = await pool.query(`SELECT b.x,count(b.y) as y FROM (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as x,count(account) as y FROM explorepi.operation where created_at >= now() - interval 31 day group by DATE_FORMAT(created_at, '%Y-%m-%d'),account order by x desc) as b group by b.x ;`)
    result = await JSON.parse(JSON.stringify(result))
    activeRef.set({'account':result},{merge:true})
}
async function getactiveMonth(){
    let result = await pool.query(`SELECT b.x,count(b.y) as y FROM (SELECT DATE_FORMAT(created_at, '%Y-%m') as x,count(account) as y FROM explorepi.operation group by DATE_FORMAT(created_at, '%Y-%m'),account) as b group by b.x ;`)
    result = await JSON.parse(JSON.stringify(result))
    activeRef.set({'accountMonth':result},{merge:true})
}
async function getblock(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as x,count(id) as y,sum(success) as tx,sum(operation) as op,sum(fail) as tx_fail FROM explorepi.block where created_at >= now() - interval 31 day group by DATE_FORMAT(created_at, '%Y-%m-%d');`)
    result = await JSON.parse(JSON.stringify(result))
    netRef.set({'block':result},{merge:true})
}
async function getblockMonth(){
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m') as x,count(id) as y,sum(success) as tx,sum(operation) as op,sum(fail) as tx_fail FROM explorepi.block group by DATE_FORMAT(created_at, '%Y-%m');`)
    result = await JSON.parse(JSON.stringify(result))
    netRef.set({'blockMonth':result},{merge:true})
}
async function getAccountCreation() {
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m') as x,count(*)as y FROM explorepi.Account where Role = 'Pioneer' group by DATE_FORMAT(created_at, '%Y-%m') order by x;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'accountCreation':result},{merge:true})
}
async function getPioneerLock() {
    let result = await pool.query(`SELECT DATE_FORMAT(created_at, '%Y-%m') as x,sum(amount) as y FROM explorepi.claimant where ct_create = 0 group by DATE_FORMAT(created_at, '%Y-%m') order by x asc;`)
    result = await JSON.parse(JSON.stringify(result))
    docRef.set({'pioneerlock':result},{merge:true})
}

async function init(){
    await getPioneerLock()
    await getAccountCreation()
    await getblocktime() 
    await getopdistribute()
    await getclaimed()
    await getclaimedback()
    await getclaimanthistory()
    await getclaimedMonth()
    await getclaimedbackMonth()
    await getclaimanthistoryMonth()
    await getblocktimeMonth()
    await getlockupperiod()
    await getmetric()
    await getunlocknotclaimed()
    await getavailablepi()
    await getfutureunlock()
    await getfutureunlockMonth()
    await getoneyearunclaimed()
    await getholderrank()
    await getactive()
    await getactiveMonth()
    await getblock()
    await getblockMonth()
    docRef.set({
        timestamp: Date.now()
        },{merge:true});
}
module.exports = {init};