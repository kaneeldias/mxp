"use client"

import {Member} from "@/app/_types/MemberTypes";
import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";
import Image from "next/image"
import {getMembersStartBreadcrumbs} from "@/app/members/MemberListData";

export default function MemberData({member}: { member: Member }) {
    const context = useContext(AppContext);
    const breadcrumbs = context!.breadcrumbs;
    useEffect(() => {
        breadcrumbs.set(getMemberBreadcrumbs(member))
    }, []);
    return (<></>)
}

export function getMemberBreadcrumbs(member: Member): Breadcrumb[] {
    let breadcrumbs = getMembersStartBreadcrumbs();
    breadcrumbs.push(
        {
            label: (
                <div className="flex flex-row space-x-2 md:space-x-4 items-center justify-center">
                    <div className="w-4 h-4 md:w-8 md:h-8 relative">
                        <Image src={member.profile_photo!}
                               fill
                               objectFit="cover"
                               alt={`${member.full_name} profile photo`}
                               className="rounded-full"/>
                    </div>
                    <span className="text-xs md:text-xl hidden md:block">{member.full_name!.split(" ")[0]}</span>
                </div>
            ), href: `/members/${member.id}`
        }
    );
    return breadcrumbs;

}
