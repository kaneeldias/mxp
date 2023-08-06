"use client"

import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb, getHomeBreadcrumbs} from "@/app/_components/BreadcrumbsBar";
import {PeopleIcon} from "@/_lib/icons-material";

export default function MemberListData() {
    const context = useContext(AppContext);
    const breadcrumbs = context!.breadcrumbs;
    useEffect(() => {
        breadcrumbs.set(getMembersStartBreadcrumbs());
    }, []);
    return (<></>)
}

export function getMembersStartBreadcrumbs(): Breadcrumb[] {
    let breadcrumbs: Breadcrumb[] = getHomeBreadcrumbs();
    breadcrumbs.push({
        label:
            (
                <>
                    <PeopleIcon fontSize="large" className="hidden md:block"/>
                    <PeopleIcon fontSize="small" className="block md:hidden"/>
                </>
            ), href: "/members"
    });
    return breadcrumbs;
}
