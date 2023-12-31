"use client"

import {Position} from "@/app/_types/MemberTypes";
import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";
import {getMemberBreadcrumbs} from "@/app/members/[expaId]/MemberData";

export default function PositionData({position}: { position: Position }) {
    const context = useContext(AppContext);
    const breadcrumbs = context!.breadcrumbs;
    useEffect(() => {
        breadcrumbs.set(getPositionBreadcrumbs(position))
    }, []);
    return (<></>)
}

export function getPositionBreadcrumbs(position: Position): Breadcrumb[] {
    let breadcrumbs = getMemberBreadcrumbs(position.person!);
    breadcrumbs.push(
        {
            label: `${truncatePosition(position.title)}`,
            href: `/members/${position.person.id}/position/${position.id}`
        }
    );
    return breadcrumbs;

}

function truncatePosition(str: string) {
    if (str.length > 25) {
        return str.substring(0, 25 - 3) + '...';
    }
    return str;
}
