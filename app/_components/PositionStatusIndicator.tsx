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
              className="rounded-full w-24 justify-center whitespace-nowrap"/>
    );
};
