"use client"

import {Member} from "@/app/_types/MemberTypes";
import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";
import {getMembersStartBreadcrumbs} from "@/app/members/MemberListData";
import MemberChip from "@/app/_components/MemberChip";

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
                <MemberChip member={member} truncateName={true} largeText={true}/>
            )
        }
    );
    return breadcrumbs;

}
