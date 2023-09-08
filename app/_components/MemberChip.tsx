"use client"

import React from 'react';
import {Avatar, Chip} from "@/_lib/tailwind-material";
import Link from "next/link";
import {Member} from "@/app/_types/MemberTypes";

export default function MemberChip(props: { member: Member, truncateName?: boolean }) {
    const member: Member = props.member;
    const truncateName = props.truncateName ?? false;

    return (
        <div className="inline-block">
            <Link href={`/members/${member.id}`}>
                <Chip
                    size="lg"
                    icon={
                        <Avatar
                            size="xxl"
                            variant="circular"
                            className="h-full w-full -translate-x-0.5"
                            alt={member.full_name}
                            src={member.profile_photo}
                        />
                    }
                    value={
                        <div>
                            {!truncateName ? (member.full_name) : (member.full_name.split(" ")[0])}
                        </div>
                    }
                    className="rounded-full py-1.5 bg-gray-200 text-gray-800 hover:bg-aiesec-blue hover:text-white transition-all duration-300 text-md font-normal capitalize flex items-center"
                />
            </Link>
        </div>
    );
};
