require("dotenv").config();
const pool = require("./database");
const StellarSdk = require("stellar-sdk");
const horizon = process.env["HORIZON_URL"];
// @ts-ignore
const server = new StellarSdk.Server(horizon);

//First cursor is 60129546240(paging_token)
let lastprocess;
let streamer, worker;
async function transaction() {
  try {
    let result = await pool.query(`SELECT * FROM explorepi.metadata;`);
    result = await JSON.parse(JSON.stringify(result));
    let lastCursor = result[0].tx_cursor;
    worker = 0;
    streamer = server
      .transactions()
      // @ts-ignore
      .cursor(lastCursor)
      .stream({
        onmessage: txHandler,
      });
    console.log("tx start");
  } catch (e) {
    console.log(e);
  }
  return;
}

function txHandler(res) {
  lastprocess = res.paging_token;
  //console.log('Last : ' +lastprocess)
  if (res.successful) {
    let date = res.created_at.slice(0, 19).replace("T", " ");
    let amount = parseInt(res.fee_charged) / 10000000;
    let sql =
      "INSERT INTO fee(id,created_at,account,amount) VALUES ('" +
      res.paging_token +
      "','" +
      date +
      "','" +
      res.source_account +
      "'," +
      amount +
      ")";
    let string = res.paging_token + " transaction finished";
    worker += 1;
    pool.ex_sql(sql, string).then((worker -= 1));
  }
  pool.ex_sql("UPDATE metadata SET tx_cursor = " + lastprocess);
}
function txclose() {
  return new Promise((resolve, reject) => {
    if (worker == 0) {
      resolve(lastprocess);
    } else {
      setTimeout(txclose, 1000);
    }
  });
}
function txstreamclose() {
  streamer();
}

module.exports = { txclose, txstreamclose, transaction };
