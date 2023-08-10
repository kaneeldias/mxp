"use client"

import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb, getHomeBreadcrumbs} from "@/app/_components/BreadcrumbsBar";
import {ApartmentIcon} from "@/_lib/icons-material";

export default function CommitteeListData() {
    const context = useContext(AppContext);
    const breadcrumbs = context!.breadcrumbs;
    useEffect(() => {
        breadcrumbs.set(getCommitteesStartBreadcrumbs());
    }, []);
    return (<></>)
}

export function getCommitteesStartBreadcrumbs(): Breadcrumb[] {
    let breadcrumbs: Breadcrumb[] = getHomeBreadcrumbs();
    breadcrumbs.push({
        label:
            (
                <>
                    <ApartmentIcon fontSize="large"
                                   className="hidden md:block hover:text-aiesec-blue transition-all duration-300"/>
                    <ApartmentIcon fontSize="small"
                                   className="block md:hidden hover:text-aiesec-blue transition-all duration-300"/>
                </>
            ), href: "/committee"
    });
    return breadcrumbs;
}
