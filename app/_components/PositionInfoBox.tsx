"use client"

import React from 'react';
import Image from "next/image";
import {convertTerm} from "@/utils/utils";
import {Position} from "@/app/_types/MemberTypes";
import Link from "next/link";
import PositionStatusIndicator from "@/app/_components/PositionStatusIndicator";

type PositionInfoBox = {
    position: Position;
};

export default function PositionInfoBox(props: PositionInfoBox) {
    const position = props.position;

    return (
        <div className="space-x-10 p-5 items-center flex">
            <div className="justify-center inline-flex">
                <Image
                    src={position?.person.profile_photo!}
                    width={150}
                    height={150}
                    alt={`${position?.person.full_name} profile photo`}
                    className="rounded-full"
                />
            </div>
            <div className="flex justify-center flex-col space-y-3 text-gray-600">
                <Link href={`/members/${position?.person.id}`}>
                    <div className="text-lg hover:underline">{position?.person.full_name}</div>
                </Link>
                <div className="text-3xl flex flex-row font-bold space-x-5 text-gray-800">
                    <div>{position?.title}</div>
                    {position?.status && <PositionStatusIndicator type={position.status}/>}
                </div>
                <div
                    className="text-xl text-gray-600">{`${position?.office.full_name} (${convertTerm(position!.term.name)})`}</div>
            </div>
        </div>
    );
};
