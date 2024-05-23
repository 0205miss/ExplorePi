"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function RankTable({ data }) {
  return (
    <>
      <div className="text-center my-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom">
        Rank
      </div>
      <Table
        isStriped
        aria-label="Example static collection table"
        className="my-4"
      >
        <TableHeader>
          <TableColumn>Holding</TableColumn>
          <TableColumn>Pioneer</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{"<=1"}</TableCell>
            <TableCell>{data[0].result}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>{"<=10"}</TableCell>
            <TableCell>{data[1].result}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>{"<=100"}</TableCell>
            <TableCell>{data[2].result}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>{"<=500"}</TableCell>
            <TableCell>{data[3].result}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>{"<=1,000"}</TableCell>
            <TableCell>{data[4].result}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>{"<=5,000"}</TableCell>
            <TableCell>{data[5].result}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>{"<=10,000"}</TableCell>
            <TableCell>{data[6].result}</TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell>{"<=100,000"}</TableCell>
            <TableCell>{data[7].result}</TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell>{"<=1,000,000"}</TableCell>
            <TableCell>{data[8].result}</TableCell>
          </TableRow>
          {data[9].result != undefined && <TableRow key="10">
            <TableCell>{">1,000,000"}</TableCell>
            <TableCell>{data[9].result}</TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </>
  );
}
