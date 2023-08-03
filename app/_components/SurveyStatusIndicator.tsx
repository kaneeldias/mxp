"use client"

import React from 'react';
import {SurveyStatus} from "@/app/_types/SurveyTypes";

type StatusIndicatorProps = {
    type: string;
};

const styleClass = "inline-block text-xs rounded-md text-white font-normal p-1 px-2"
const buttonColours = {
    [SurveyStatus.FILLED]: "bg-green-600",
    [SurveyStatus.NOT_AVAILABLE]: "bg-slate-600",
    [SurveyStatus.NOT_FILLED]: "bg-red-600"
}
export default function SurveyStatusIndicator(props: StatusIndicatorProps) {
    let type: SurveyStatus;
    if (props.type === SurveyStatus.FILLED) type = SurveyStatus.FILLED;
    else if (props.type === SurveyStatus.NOT_FILLED) type = SurveyStatus.NOT_FILLED;
    else type = SurveyStatus.NOT_AVAILABLE;

    return (
        <div className={`${styleClass} ${buttonColours[type]}`}>{type}</div>
    );
};
