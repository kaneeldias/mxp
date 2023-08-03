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

const styleClass = "inline-block text-xs rounded-md text-white font-normal p-1 px-2"
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
