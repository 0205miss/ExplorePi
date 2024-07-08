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
import { Cubie } from "icon/cubie";
import { Failed } from "icon/fail";
import { Fee } from "icon/fee";
import { User } from "icon/user";
import getago from "lib/time";

export default function TransactionCard({ data, time, lang }) {
  const ledger = data.ledger_attr.toString();
  return (
    <Card>
      <CardBody>
        <div className="flex">
          <div className="flex items-center px-1 gap-2">
            <Button
              href={`/${lang}/block/` + data.ledger_attr}
              as={Link}
              isIconOnly
              radius="md"
              size="sm"
              className=" fill-success-600 p-1"
            >
              <Cubie />
            </Button>
            <div className="flex-col flex justify-around">
              <div>{ledger}</div>
              <div>{data.hash.substring(0, 5) + "..."}</div>
            </div>
            <Button
              href={`/${lang}/account/` + data.source_account}
              as={Link}
              radius="md"
              color="warning"
              startContent={<User size={18} className='fill-purple-600'/>}
              className="p-1 text-purple-600"
            >
              {data.source_account.substring(0,5)}
            </Button>
          </div>
          <div className="grow flex justify-center items-center px-1">
            <Progress
              value={data.operation_count}
              label="Capacity"
              showValueLabel
              valueLabel={`${data.operation_count}/ 100`}
              color="secondary"
            />
          </div>
          <div className="px-1 flex gap-2 items-center w-36">
            <div className="flex-col flex justify-center gap-1">
              <div className="w-full flex justify-center">
                {data.successful ? (
                  <Chip color="success" sie="sm" radius="sm" variant="flat">
                    <CheckIcon size={18} />
                  </Chip>
                ) : (
                  <Chip color="danger" size="sm" radius="sm" variant="flat">
                    <Failed size={18} className=" fill-danger" />
                  </Chip>
                )}
              </div>
              <div className="w-full flex justify-center">
                <Chip
                  color="warning"
                  size="sm"
                  radius="sm"
                  variant="flat"
                  className="py-3"
                  startContent={<Fee size={18} className=" fill-warning" />}
                >
                  {data.fee_charged / 10000000} Pi
                </Chip>
              </div>
            </div>

            <div className="flex-col flex justify-around gap-1">
              {getago(data.created_at, time)}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
