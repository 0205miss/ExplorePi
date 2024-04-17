"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function DailyTable({ data }) {
  return (
    <>
      <div className="text-center my-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom">
        24hr Activity
      </div>
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
            <TableCell>Active Pioneer</TableCell>
            <TableCell>{data.active}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Fee</TableCell>
            <TableCell>{parseFloat(data.fee)}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Operation</TableCell>
            <TableCell>{data.op}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Pay Frequency</TableCell>
            <TableCell>{data.pay}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Pay Volume</TableCell>
            <TableCell>{data.payamount}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>AVG. Pay Volume</TableCell>
            <TableCell>
              {parseFloat((parseFloat(data.payamount) / data.pay).toFixed(7))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
