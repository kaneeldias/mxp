"use client"

import React, {useContext} from 'react';
import {Breadcrumbs} from "../../lib/mui";
import {HomeIcon, NavigateNextIcon} from "../../lib/icons-material";
import Link from "next/link";
import {AppContext} from "@/app/_context/AppContext";

export type Breadcrumb = {
    label: React.ReactNode;
    href?: string;
}

export default function BreadcrumbsBar() {
    let breadcrumbs = getHomeBreadcrumbs();

    const context = useContext(AppContext);
    if (context != null) {
        breadcrumbs = context.breadcrumbs.value;
    }
    let breadcrumbsJSX: React.JSX.Element[] = [];

    breadcrumbs.forEach((breadcrumb, index) => {
        if (breadcrumb.href) {
            breadcrumbsJSX.push(
                <Link key={index + 1} color="inherit" href={breadcrumb.href} className="hover:underline text-lg">
                    {breadcrumb.label}
                </Link>
            );
        } else {
            breadcrumbsJSX.push(
                <span key={index + 1} color="inherit">
                    {breadcrumb.label}
                </span>
            );
        }
    });

    return (
        <div className="p-5 border-b-2">
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="large"/>}
                aria-label="breadcrumb"
                className="text-md"
            >
                {breadcrumbsJSX}
            </Breadcrumbs>
        </div>
    );
};

export function getHomeBreadcrumbs(): Breadcrumb[] {
    return [
        {
            label:
                (
                    <HomeIcon fontSize="large"/>
                ), href: "/"

        }
    ];
}