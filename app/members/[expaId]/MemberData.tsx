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
                <div className="flex flex-row space-x-2">
                    <Image src={member.profile_photo!} alt={`${member.full_name} profile photo`} width={20}
                           height={20} className="rounded-full"/>
                    <span>{member.full_name!}</span>
                </div>
            ), href: `/members/${member.id}`
        }
    );
    return breadcrumbs;

}
