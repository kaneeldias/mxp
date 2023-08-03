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
        <div className="space-x-5 flex flex-row justify-center items-stretch mr-16">
            {memberInfo.profile_photo &&
                <Image
                    src={memberInfo.profile_photo}
                    width={100}
                    height={100}
                    alt="Profile photo"
                    className="rounded-full"
                    priority
                />
            }
            <div className="flex flex-col justify-center space-y-1">
                <div className="text-xl font-bold">{memberInfo.full_name}</div>
                <div className="text-sm text-slate-500">{getLCAndMC(memberInfo)}</div>
            </div>
        </div>
    );
};
