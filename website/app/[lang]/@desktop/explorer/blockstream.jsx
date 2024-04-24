"use client";

import Script from "next/script";
import BlockCard from "./blockcard";
import { useEffect, useState } from "react";

export default function BlockStream({time}) {
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
    setdata(olddata =>[res, olddata[0], olddata[1], olddata[2], olddata[3]]);
  }
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/10.4.1/stellar-sdk.js"
        onLoad={streamStart}
      ></Script>
      {data != [] &&
        data != undefined &&
        data.map((perblock) => {
          if (perblock == undefined || perblock == null) return;
          return <BlockCard data={perblock} key={perblock.sequence} time={time}/>;
        })}
    </>
  );
}
