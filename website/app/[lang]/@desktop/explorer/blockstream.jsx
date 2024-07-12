"use client";

import Script from "next/script";
import BlockCard from "./blockcard";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";

export default function BlockStream({time,lang}) {
  const [data, setdata] = useState([]);
  const [server, setserver] = useState();
  const streamStart = () => {
    setserver(new StellarSdk.Server(process.env["NEXT_PUBLIC_HORIZON_SERVER"]));
  };
  useEffect(() => {
    if (server) {
      server
        .ledgers()
        .cursor("now")
        .stream({
          onmessage: (res) => {
            handler_data(res);
          },
        });
    }
  }, [server]);

  function handler_data(res) {
    setdata(olddata =>[res]);
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/10.4.1/stellar-sdk.js"
        onReady={streamStart}
      ></Script>
      {data != [] &&
        data != undefined &&
        data.map((perblock,i) => {
          if (perblock == undefined || perblock == null) return <Skeleton key={i} className="my-2">
          <BlockCard
            data={{
              sequence: 10000000,
              hash: "afahgfighzs",
              tx_set_operation_count: 0,
              max_tx_set_size: 1000,
              successful_transaction_count: 20,
              failed_transaction_count: 10,
              closed_at: "2021-01-27T22:58:44Z",
            }}              
            time={time}
            lang={lang}
          />
        </Skeleton>;
          return <div className="my-2" key={perblock.sequence}><BlockCard  data={perblock} time={time} lang={lang}/></div>;
        })}
        {data.length < 1 &&
        [...Array(1 - data.length)].map((x, i) => (
          <Skeleton key={i} className="my-2">
            <BlockCard
              data={{
                sequence: 10000000,
                hash: "afahgfighzs",
                tx_set_operation_count: 0,
                max_tx_set_size: 1000,
                successful_transaction_count: 20,
                failed_transaction_count: 10,
                closed_at: "2021-01-27T22:58:44Z",
              }}              
              time={time}
              lang={lang}
            />
          </Skeleton>
        ))}
    </>
  );
}
