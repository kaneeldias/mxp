"use client"

import React from 'react';
import PositionStatusIndicator from "@/app/_components/PositionStatusIndicator";
import {Position} from "@/app/_types/MemberTypes";
import {convertDateToReadable, convertTerm} from "@/utils/utils";

type MemberPositionCardProps = {
    position: Position;
};

export default function MemberPositionCard(props: MemberPositionCardProps) {
    const position = props.position;

    return (
        <div
            className="mb-10 space-y-1 border-l-4 border-slate-300 pl-2 hover:bg-slate-100 p-3 transition duration-300 hover:border-aiesec-blue rounded-r-md"
            key={position.id}>
            <div className="flex flex-row font-bold space-x-4">
                <div>{position.title}</div>
                <PositionStatusIndicator type={position.status}/>

            </div>
            <div className="text-xs text-slate-500">
                {position.office.full_name} ({convertTerm(position.term.name)})
            </div>
            <div className="text-xs text-slate-500">
                {convertDateToReadable(position.start_date)} to {convertDateToReadable(position.end_date)}
            </div>
        </div>
    );
};
