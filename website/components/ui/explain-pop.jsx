"use client";
import { Popover, PopoverTrigger,PopoverContent } from "@/components/ui/popover";
import { Button } from "@nextui-org/react";
import { Info } from "icon/info";

export default function ExplainPopOver({title="",content=""}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color="warning" variant="light" isIconOnly className="items-center" >
          <Info/>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="bg-white">
      <div className="px-1 py-2">
          <div className="text-small font-bold">{title}</div>
          <div className="text-tiny">{content}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
