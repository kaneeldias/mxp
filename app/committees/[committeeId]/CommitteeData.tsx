"use client"

import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";
import {Committee} from "@/app/_types/CommitteeTypes";
import {getCommitteesStartBreadcrumbs} from "@/app/committees/CommitteeListData";
import CommitteeChip from "@/app/_components/CommitteeChip";

export default function CommitteeData({committee}: { committee: Committee }) {
    const context = useContext(AppContext);
    const breadcrumbs = context!.breadcrumbs;
    useEffect(() => {
        breadcrumbs.set(getCommitteeBreadcrumbs(committee))
    }, []);
    return (<></>)
}

export function getCommitteeBreadcrumbs(committee: Committee): Breadcrumb[] {
    let breadcrumbs = getCommitteesStartBreadcrumbs();
    breadcrumbs.push(
        {
            label: (<div><CommitteeChip committee={committee}/></div>),
            href: `/committees/${committee.id}`
        }
    );
    return breadcrumbs;

}

function truncateCommittee(str: string) {
    if (str.length > 30) {
        str = str.replace("AIESEC in", "");
    }

    if (str.length > 30) {
        return str.substring(0, 25 - 3) + '...';
    }
    return str;
}
