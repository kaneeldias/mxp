"use client"

import React from 'react';
import {Avatar, Chip} from "@/_lib/tailwind-material";
import Link from "next/link";
import {Member} from "@/app/_types/MemberTypes";

export default function MemberChip(props: { member: Member, truncateName?: boolean, largeText?: boolean }) {
    const member: Member = props.member;
    const truncateName = props.truncateName ?? false;
    const largeText = props.largeText ?? false;

    return (
        <div className="inline-block">
            <Link href={`/members/${member.id}`}>
                <Chip
                    size="lg"
                    icon={
                        <>
                            <Avatar
                                size="xxl"
                                variant="circular"
                                className={`block h-full w-full`}
                                alt={member.full_name}
                                src={member.profile_photo}
                            />
                        </>
                    }
                    value={
                        <div>
                            {!truncateName ? (member.full_name) : (member.full_name.split(" ")[0])}
                        </div>
                    }
                    className="rounded-full bg-gray-200 text-gray-800 hover:bg-aiesec-blue hover:text-white transition-all duration-300 text-md font-normal capitalize flex items-center"
                />
            </Link>
        </div>
    );
};
