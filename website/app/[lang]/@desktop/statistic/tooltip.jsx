'use client'

import { Button, Tooltip } from "@nextui-org/react";
import { Info } from "icon/info";
import { useState } from "react";

export default function ToolTipMayLost(){
    const [isOpen, setIsOpen] = useState(false);
return (
    <Tooltip
        content='Not claim after unlock 1 year'
        isOpen={isOpen}
    >
        <Button
        isIconOnly
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onPress={() => setIsOpen(!isOpen)}
        >
            <Info className='fill-cyan-400 h-6'/>
        </Button>
    </Tooltip>
);
}