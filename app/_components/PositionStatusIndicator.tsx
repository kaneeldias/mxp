"use client"

import React from 'react';
import {Chip} from "@/_lib/tailwind-material";
import {color} from "@material-tailwind/react/types/components/chip";

export enum Status {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    TERMINATED = "TERMINATED"
}

type StatusIndicatorProps = {
    type: string;
};

const styleClass = "flex inline-block text-[6px] md:text-xs rounded-full text-white p-0 w-16 md:w-32 h-5 md:h-8 items-center justify-center font-bold opacity-80 flex-shrink-0 pt-[2px]"
const buttonColours = {
    [Status.ACTIVE]: "green",
    [Status.COMPLETED]: "blue",
    [Status.TERMINATED]: "red"
}
export default function PositionStatusIndicator(props: StatusIndicatorProps) {
    let type: Status;
    if (props.type === "active") type = Status.ACTIVE;
    else if (props.type === "completed") type = Status.COMPLETED;
    else type = Status.TERMINATED;

    return (
        <Chip variant="ghost" value={type} color={buttonColours[type].toString() as color}
              className="rounded-full w-16 md:w-32 justify-center"/>
    );
};
