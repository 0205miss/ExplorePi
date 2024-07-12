"use client";

import { Button, Card, CardBody, Chip, Link, Progress } from "@nextui-org/react";
import { CheckIcon } from "icon/check";
import { Cubie } from "icon/cubie";
import { Failed } from "icon/fail";
import getago from "lib/time";

export default function BlockCard({data,time,lang}) {
  return (
    <Card className="my-2">
      <CardBody>
        <div className="flex">
          <div className="flex items-center px-1 gap-2">
            <Button href={`/${lang}/block/`+data.sequence} as={Link} isIconOnly radius="md" size="sm" className=" fill-success-600 p-1">
              <Cubie />
            </Button>
            <div className="flex-col flex justify-around">
              <div>{data.sequence}</div>
              <div>{data.hash.substring(0,5)+'...'}</div>
            </div>
          </div>
          <div className="grow flex justify-center items-center px-1">
            <Progress value={data.tx_set_operation_count/10} label="Capacity" showValueLabel valueLabel={`${data.tx_set_operation_count}/${data.max_tx_set_size}`} color="secondary" />
          </div>
          <div className="px-1 flex gap-2 items-center w-36">
            <div className="flex-col flex justify-around gap-1">
              <Chip color="success" size="sm" radius="sm" startContent={<CheckIcon size={18} />} variant="flat">{data.successful_transaction_count}</Chip>
              <Chip color="danger" size="sm" radius="sm" startContent={<Failed size={18} className=' fill-danger'/>} variant="flat">{data.failed_transaction_count}</Chip>
            </div>

            <div className="flex-col flex justify-around gap-1">
            {getago(data.closed_at,time)}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
