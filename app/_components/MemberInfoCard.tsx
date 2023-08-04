"use client"

import React from 'react';
import {Member} from "@/app/_types/MemberTypes";
import Image from "next/image";
import {getLCAndMC} from "@/utils/utils";

type MemberInfoCardProps = {
    member: Member;
};

export default function MemberInfoCard(props: MemberInfoCardProps) {
    const memberInfo = props.member;

    return (
        <div className="space-x-10 flex flex-row justify-center items-stretch mr-16">
            {memberInfo.profile_photo &&
                <Image
                    src={memberInfo.profile_photo}
                    width={150}
                    height={150}
                    alt="Profile photo"
                    className="rounded-full"
                    priority
                />
            }
            <div className="flex flex-col justify-center space-y-3">
                <div className="text-3xl font-bold text-gray-800">{memberInfo.full_name}</div>
                <div className="text-xl text-gray-400">{getLCAndMC(memberInfo)}</div>
            </div>
        </div>
    );
};
