"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Link,
  Progress,
} from "@nextui-org/react";
import { CheckIcon } from "icon/check";
import { Failed } from "icon/fail";
import { Tx } from "icon/tx";
import { User } from "icon/user";
import getago from "lib/time";
import { formatTrans } from "lib/translate";

export default function OperationCard({ data, time, lang, opts }) {
  let detail, value, type;

  switch (data.type) {
    case "create_account":
      type = opts.type.create_account;
      value = {
        a: data.funder.substring(0, 4),
        b: data.account.substring(0, 4),
        amount: parseFloat(data.starting_balance),
      };
      detail = formatTrans(opts.create_account, value);
      break;
    case "payment":
      type = opts.type.payment;
      value = {
        a: data.from.substring(0, 4),
        b: data.to.substring(0, 4),
        amount: parseFloat(data.amount),
      };
      detail = formatTrans(opts.payment, value);
      break;
    case "create_claimable_balance":
      type = opts.type.create_claimable_balance;
      value = {
        a: data.sponsor.substring(0, 4),
        b:
          data.sponsor ==
          "GABT7EMPGNCQSZM22DIYC4FNKHUVJTXITUF6Y5HNIWPU4GA7BHT4GC5G"
            ? data.claimants[1].destination.substring(0, 4)
            : data.claimants[0].destination.substring(0, 4),
        amount: parseFloat(data.amount),
      };
      detail = formatTrans(opts.create_claimable_balance, value);
      break;
    case "claim_claimable_balance":
      type = opts.type.claim_claimable_balance;
      value = {
        a: data.source_account.substring(0, 4),
      };
      detail = formatTrans(opts.claim_claimable_balance, value);
      break;
    default:
      break;
  }
  return (
    <Card>
      <CardBody>
        <div className="flex">
          <div className="flex items-center px-1 gap-2">
            <Button
              href={`/${lang}/tx/` + data.transaction_hash}
              as={Link}
              radius="md"
              className=" fill-success-600 w-28"
              startContent={<Tx size={18} className="fill-success" />}
            >
              {data.transaction_hash.substring(0, 5) + "..."}
            </Button>
            <Button
              href={`/${lang}/account/` + data.source_account}
              as={Link}
              radius="md"
              color="warning"
              startContent={<User size={18} className="fill-purple-600" />}
              className="text-purple-600 w-28"
            >
              {data.source_account.substring(0, 5)}
            </Button>
          </div>
          <div className="flex justify-center items-center w-44">{type}</div>
          <div className=" flex-auto flex items-center justify-center">{detail}</div>
          <div className="px-1 flex gap-2 items-center">
            <div className="flex-col flex justify-around gap-1">
              {data.transaction_successful ? (
                <Chip color="success" sie="sm" radius="sm" variant="flat">
                  <CheckIcon size={18} />
                </Chip>
              ) : (
                <Chip color="danger" size="sm" radius="sm" variant="flat">
                  <Failed size={18} className=" fill-danger" />
                </Chip>
              )}
            </div>

            <div className="flex-col flex justify-around gap-1">
              {getago(data.closed_at, time)}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
