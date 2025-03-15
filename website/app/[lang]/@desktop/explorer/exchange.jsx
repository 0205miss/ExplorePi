"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Reload } from "icon/reload";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const columns = [
  {
    key: "name",
    label: "Exchange",
  },
  {
    key: "acc",
    label: "Account",
  },
  {
    key: "balance",
    label: "Balance",
  },
];

export default function ExchangeStat() {
  const [loading, setLoading] = useState(true);
  const exchanges = [
    {
      key: "1",
      name: "OKX",
      account: "GALYJFJ5SVD45FBWN2GT4IW67SEZ3IBOFSBSPUFCWV427NBNLG3PXEQU",
      acc: "GALY",
      balance: "TBD",
    },
    {
      key: "2",
      name: "Bitget",
      account: "GDFNWH6ZFJVHJDLBMNOUT35X4EEKQVJAO3ZDL4NL7VQJLC4PJOQFWJ75",
      acc: "GDFN",
      balance: "TBD",
    },
    {
      key: "3",
      name: "Gate.io",
      account: "GBC6NRTTQLRCABQHIR5J4R4YDJWFWRAO4ZRQIM2SVI5GSIZ2HZ42RINW",
      acc: "GBC6",
      balance: "TBD",
    },
    { key: "4", name: "MEXC", account: "TBD", acc: "TBD", balance: "TBD" },
  ];
  const [exchangedata, setexchangedata] = useState(exchanges);

  const callApi = async (element) => {
    let res = await fetch(
      process.env["NEXT_PUBLIC_HORIZON_SERVER"] + "accounts/" + element.account
    );
    res = await res.json();
    return res;
  };

  const updateStatus = async () => {
    setLoading(true);
    let ary = [...exchangedata];
    for (let i in exchanges) {
      if (exchanges[i].account != "TBD") {
        let res = await callApi(exchanges[i]);
        let g = ary.findIndex(function (e) {
          return e.key == exchanges[i].key;
        });
        ary[g].balance = Number.parseFloat(
          res.balances[0].balance
        ).toLocaleString("en-US");
      }
    }
    console.log(ary);
    setLoading(false);
    setexchangedata(ary);
  };

  useEffect(() => {
    updateStatus();
  }, []);

  return (
    <>
      <Card className="mt-3">
        <CardHeader>
          <div className="flex justify-between w-full pr-4  h-5">
            <div className="">Exchange Hold</div>
            <div className="h-5 w-5" onClick={updateStatus}><Reload/></div>
          </div>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={exchangedata}>
              {exchangedata.map((row) => (
                <TableRow key={row.key}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey == "balance" && loading && (
                        <BounceLoader
                          color="orange"
                          size={15}
                          loading={loading}
                        />
                      )}
                      {columnKey != "balance" && getKeyValue(row, columnKey)}
                      {columnKey == "balance" &&
                        !loading &&
                        getKeyValue(row, columnKey) != "TBD" &&
                        `${getKeyValue(row, columnKey)} Pi`}
                      {columnKey == "balance" &&
                        !loading &&
                        getKeyValue(row, columnKey) == "TBD" &&
                        "TBD"}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
