"use client"

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {VicePresident} from "@/_services/CommitteeService";
import {truncateString} from "@/_utils/utils";

type VicePresidentBoxProps = {
    vicePresident: VicePresident;
};

export default function VicePresidentBox(props: VicePresidentBoxProps) {
    const vicePresident: VicePresident = props.vicePresident;

    return (
        <Link href={`/members/${vicePresident.id}`} className="flex w-full">
            <div
                className="p-5 pl-2 md:w-72 hover:bg-gray-100 transition-all duration-300 cursor-pointer rounded-lg w-full ease-in-out">
                <div
                    className="space-x-4 md:space-x-0 space-y-0 md:space-y-5 justify-start md:items-center md:justify-center flex md:flex-col">
                    <div className="justify-center inline-flex">
                        <div className="w-14 h-14 md:w-24 md:h-24 relative">
                            <Image
                                src={vicePresident.profile_photo}
                                fill
                                objectFit="cover"
                                alt={`${vicePresident.full_name} profile photo`}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div
                        className="flex items-start justify-center flex-col md:space-y-1 text-gray-600 md:items-center">
                        <div
                            className="text-md md:text-xl font-bold text-gray-800 items-center justify-center flex md:text-center leading-[18px] md:leading-normal">{truncateString(vicePresident.full_name, 25)}</div>
                        <div
                            className="text-xs md:text-center leading-[12px] md:leading-normal mt-2">{truncateString(vicePresident.title, 40)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
