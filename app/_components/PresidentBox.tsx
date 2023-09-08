"use client"

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {President} from "@/_services/CommitteeService";

type PresidentBoxProps = {
    president: President;
};

export default function PresidentBox(props: PresidentBoxProps) {
    const president: President = props.president;

    return (
        <Link href={`/members/${president.id}`}>
            <div className={"hover:bg-gray-100 transition-all duration-300 ease-in-out p-5 pl-2 rounded-lg"}>
                <div className="space-x-4 md:space-x-5 items-center flex">
                    <div className="justify-center inline-flex">
                        <div className="w-20 h-20 md:w-28 md:h-28 relative">
                            <Image
                                src={president.profile_photo}
                                fill
                                sizes={"100%"}
                                alt={`${president.full_name} profile photo`}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center flex-col md:space-y-1 text-gray-600">
                        <div className="text-md md:text-xl">President</div>
                        <div
                            className="text-lg md:text-2xl font-bold text-gray-800">{president.full_name}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
