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
        <>
            {position &&
                <div className="space-x-4 md:space-x-10 p-5 items-center flex">
                    <div className="justify-center inline-flex">
                        <div className="w-20 h-20 md:w-40 md:h-40 relative">
                            <Image
                                src={position?.person.profile_photo!}
                                fill
                                objectFit="cover"
                                alt={`${position?.person.full_name} profile photo`}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center flex-col md:space-y-3 text-gray-600">
                        <Link href={`/members/${position?.person.id}`}>
                            <div className="text-sm md:text-xl hover:underline">{position?.person.full_name}</div>
                        </Link>
                        <div className="text-lg md:text-3xl flex flex-row font-bold space-x-5 text-gray-800">
                            <div>{position?.title}</div>
                            {position?.status && <PositionStatusIndicator type={position.status}/>}
                        </div>
                        <div
                            className="text-sm md:text-xl text-gray-600">{`${position?.office.full_name} (${convertTerm(position!.term.name)})`}</div>
                    </div>
                </div>
            }
        </>
    );
};
