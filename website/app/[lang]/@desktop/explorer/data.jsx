"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
export default function BlockChainData({ data,transcript }) {
    const totalpioneer = Number.parseInt(data.lockuptime[0].no_lock+
        data.lockuptime[0].oneyear+
        data.lockuptime[0].sixmonths+
        data.lockuptime[0].threeyear+
        data.lockuptime[0].twoweek).toLocaleString("en-US")
  return (
    <Table
        isStriped
        hideHeader
        aria-label="Example static collection table"
        className="my-4"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{transcript.Metrics.TotalAccount}</TableCell>
            <TableCell>{Number.parseInt(data.metric.TotalAccount).toLocaleString("en-US")}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>{transcript.Metrics.TotalPioneer}</TableCell>
            <TableCell>{totalpioneer}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>{transcript.Metrics.MigratedPi}</TableCell>
            <TableCell>{Number.parseFloat(data.metric.TotalPi).toLocaleString("en-US",{maximumFractionDigits:7})} Pi</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>AvG. Ledger Time</TableCell>
            <TableCell>{data.pay}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>TPS</TableCell>
            <TableCell>{data.payamount}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Total Account</TableCell>
            <TableCell>
              {parseFloat((parseFloat(data.payamount) / data.pay).toFixed(7))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}
