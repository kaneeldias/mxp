"use client"

import React from 'react';

export enum Status {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    TERMINATED = "TERMINATED"
}

type StatusIndicatorProps = {
    type: string;
};

const styleClass = "flex inline-block text-xs rounded-full text-white p-0 w-32 items-center justify-center font-bold opacity-80"
const buttonColours = {
    [Status.ACTIVE]: "bg-green-600",
    [Status.COMPLETED]: "bg-blue-600",
    [Status.TERMINATED]: "bg-red-600"
}
export default function PositionStatusIndicator(props: StatusIndicatorProps) {
    let type: Status;
    if (props.type === "active") type = Status.ACTIVE;
    else if (props.type === "completed") type = Status.COMPLETED;
    else type = Status.TERMINATED;

    return (
        <div className={`${styleClass} ${buttonColours[type]}`}>{type}</div>
    );
};
