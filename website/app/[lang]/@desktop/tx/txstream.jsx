"use client";

import Script from "next/script";
import TransactionCard from "./txcard";
import { useEffect, useState } from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function BlockStream({ time, lang }) {
  const [data, setdata] = useState([]);
  const [server, setserver] = useState();
  const streamStart = () => {
    setserver(new StellarSdk.Server(process.env["NEXT_PUBLIC_HORIZON_SERVER"]));
  };
  useEffect(() => {
    if (server) {
      server
        .transactions()
        .cursor("now")
        .stream({
          onmessage: (res) => {
            handler_data(res);
          },
        });
    }
  }, [server]);

  function handler_data(res) {
    setdata((olddata) =>olddata.length==10 ? [res, olddata[0],olddata[1],olddata[2],olddata[3],olddata[4],olddata[5],olddata[6],olddata[7],olddata[8]] : [res, ...olddata]);
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/10.4.1/stellar-sdk.js"
        
        onReady={streamStart}
      ></Script>
      <Card>
        <CardBody>Latest Transaction Stream</CardBody>
      </Card>
      {data != [] &&
        data != undefined &&
        data.map((perblock) => {
          if (perblock == undefined || perblock == null) return;
          return (
            <div className="my-2" key={perblock.id}>
              <TransactionCard
                data={perblock}                
                time={time}
                lang={lang}
              />
            </div>
          );
        })}
      {data.length < 10 &&
        [...Array(10 - data.length)].map((x, i) => (
          <Skeleton key={i} className="my-2">
            <TransactionCard
              data={{
                ledger_attr: 10000000,
                hash: "afahgfighzs",
                source_account: 'GABV',
                successful: true,
                fee_charged: "100000",
                operation_count: 10,
                memo_type:"none", //text
                created_at: "2021-01-27T22:58:44Z",
              }}              
              time={time}
              lang={lang}
            />
          </Skeleton>
        ))}
    </>
  );
}
