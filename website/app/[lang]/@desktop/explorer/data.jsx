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
          24H LEDGER STATISTICS
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
            <TableCell>AvG. Block Time</TableCell>
            <TableCell>{parseFloat(data.daily['block_time']).toString()+'s'}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>TPS</TableCell>
            <TableCell>{parseFloat(data.daily.tps)/86400}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>OPS</TableCell>
            <TableCell>{parseFloat(data.daily.ops)/86400}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Block</TableCell>
            <TableCell>
              {data.daily.total_block}
            </TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell>Transactions</TableCell>
            <TableCell>
            {data.daily.tps}
            </TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell>Operations</TableCell>
            <TableCell>
            {data.daily.ops}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}
