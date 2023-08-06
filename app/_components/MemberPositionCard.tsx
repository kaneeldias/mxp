"use client"

import React from 'react';
import PositionStatusIndicator from "@/app/_components/PositionStatusIndicator";
import {Position} from "@/app/_types/MemberTypes";
import {convertDateToReadable, convertTerm} from "@/_utils/utils";

type MemberPositionCardProps = {
    position: Position;
};

export default function MemberPositionCard(props: MemberPositionCardProps) {
    const position = props.position;

    return (
        <div
            className="flex-shrink-0 flex-col mb-5 md:mb-10 space-y-2 md:space-y-3 border-l-2 border-slate-300 pl-2 md:pl-5 hover:bg-slate-100 p-1 md:p-3 transition duration-300 hover:border-aiesec-blue rounded-r-md"
            key={position.id}>
            <div className="flex font-bold space-x-4 inline-flex">
                <div className="text-md md:text-2xl text-gray-800">{position.title}</div>
                <PositionStatusIndicator type={position.status}/>

            </div>
            <div className="text-xs md:text-md text-gray-600 flex-shrink-0">
                {position.office.full_name} ({convertTerm(position.term.name)})
            </div>
            <div className="text-xs md:text-md text-gray-600 flex">
                {convertDateToReadable(position.start_date)} to {convertDateToReadable(position.end_date)}
            </div>
        </div>
    );
};
