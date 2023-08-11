"use client"

import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";
import {Committee} from "@/app/_types/CommitteeTypes";
import {getCommitteesStartBreadcrumbs} from "@/app/committees/CommitteeListData";

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
            label: `${truncateCommittee(committee.full_name)}`,
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
