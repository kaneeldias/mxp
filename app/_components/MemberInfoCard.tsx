"use client"

import React from 'react';
import {Member} from "@/app/_types/MemberTypes";
import Image from "next/image";
import {getLCAndMC} from "@/_utils/utils";

type MemberInfoCardProps = {
    member: Member;
};

export default function MemberInfoCard(props: MemberInfoCardProps) {
    const memberInfo = props.member;

    return (
        <div className="space-x-4 md:space-x-10 flex flex-row justify-center items-stretch mr-16">
            {memberInfo.profile_photo &&
                <div className="w-20 h-20 md:w-40 md:h-40 relative">
                    <Image
                        src={memberInfo.profile_photo}
                        fill
                        objectFit="cover"
                        alt="Profile photo"
                        className="rounded-full"
                        priority
                    />
                </div>
            }
            <div className="flex flex-col justify-center space-y-1 md:space-y-3">
                <div className="text-xl md:text-3xl font-bold text-gray-800">{memberInfo.full_name}</div>
                <div className="text-sm md:text-xl text-gray-400">{getLCAndMC(memberInfo)}</div>
            </div>
        </div>
    );
};
