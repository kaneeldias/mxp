"use client"

import React from 'react';
import Image from "next/image";
import {convertTerm} from "@/utils/utils";
import {Position} from "@/app/_types/MemberTypes";
import Link from "next/link";

type PositionInfoBox = {
    position: Position;
};

export default function PositionInfoBox(props: PositionInfoBox) {
    const position = props.position;

    return (
        <div className="flex space-x-5">
            <div className="justify-center">
                <Image
                    src={position?.person.profile_photo!}
                    width={75}
                    height={75}
                    alt={`${position?.person.full_name} profile photo`}
                    className="rounded-full"
                />
            </div>
            <div className="flex justify-center flex-col space-y-1">
                <Link href={`/members/${position?.person.id}`}>
                    <div className="text-xs hover:underline">{position?.person.full_name}</div>
                </Link>
                <div className="text-3xl flex flex-row font-bold">
                    {position?.title}
                </div>
                <div
                    className="text-md">{`${position?.office.full_name} (${convertTerm(position!.term.name)})`}</div>
            </div>
        </div>
    );
};
