"use client"

import React, {useContext} from 'react';
import {Breadcrumbs} from "@/_lib/mui";
import {HomeIcon, NavigateNextIcon} from "@/_lib/icons-material";
import Link from "next/link";
import {AppContext} from "@/app/_context/AppContext";

export type Breadcrumb = {
    label: React.ReactNode;
    href?: string;
}

export default function BreadcrumbsBar() {
    let breadcrumbs: Breadcrumb[] = [];

    const context = useContext(AppContext);
    if (context != null) {
        breadcrumbs = context.breadcrumbs.value;
    }
    let breadcrumbsJSX: React.JSX.Element[] = [];
    let breadcrumbsJSXMobile: React.JSX.Element[] = [];
    const length = breadcrumbs.length;

    breadcrumbs.forEach((breadcrumb, index) => {
        let styles = "";
        if ((length - index - 1) < 3) {
            if (breadcrumb.href) {
                breadcrumbsJSXMobile.push(
                    <Link key={index + 1} color="inherit" href={breadcrumb.href}
                          className={`hover:underline text-xs md:text-xl ${styles}`}
                    >
                        {breadcrumb.label}
                    </Link>
                );
            } else {
                breadcrumbsJSXMobile.push(
                    <span key={index + 1} color="inherit" className={`${styles}`}>
                    {breadcrumb.label}
                </span>
                );
            }
        }

        if (breadcrumb.href) {
            breadcrumbsJSX.push(
                <Link key={index + 1} color="inherit" href={breadcrumb.href}
                      className={`hover:underline text-xs md:text-xl ${styles}`}
                >
                    {breadcrumb.label}
                </Link>
            );
        } else {
            breadcrumbsJSX.push(
                <span key={index + 1} color="inherit" className={`${styles}`}>
                    {breadcrumb.label}
                </span>
            );
        }
    });

    return (
        <>
            <div className="hidden md:block">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="large"/>}
                    aria-label="breadcrumb"
                    className="text-md"
                >
                    {breadcrumbsJSX}
                </Breadcrumbs>
            </div>

            <div className="block md:hidden">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                    className="text-xs md:text-xl"
                >
                    {breadcrumbsJSXMobile}
                </Breadcrumbs>
            </div>
        </>
    );
};

export function getHomeBreadcrumbs(): Breadcrumb[] {
    return [
        {
            label:
                (
                    <>
                        <HomeIcon fontSize="large" className="hidden md:block"/>
                        <HomeIcon fontSize="small" className="block md:hidden"/>
                    </>
                ), href: "/"

        }
    ];
}