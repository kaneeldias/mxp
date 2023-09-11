"use client"

import React from 'react';
import {Member} from "@/app/_types/MemberTypes";
import Image from "next/image";
import CommitteeChip from "@/app/_components/CommitteeChip";

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
                        sizes={"100%"}
                        alt="Profile photo"
                        className="rounded-full"
                        priority
                    />
                </div>
            }
            <div className="flex flex-col justify-center space-y-1 md:space-y-3">
                <div className="text-xl md:text-3xl font-bold text-gray-800">{memberInfo.full_name}</div>
                <div className="flex md:flex-row space-x-2">
                    <CommitteeChip committee={memberInfo.home_lc!}/>
                    <CommitteeChip committee={memberInfo.home_mc!} showPrefix={false}/>
                </div>
            </div>
        </div>
    );
};
