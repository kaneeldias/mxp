"use client"

import {Position} from "@/app/_types/MemberTypes";
import React, {useContext, useEffect} from "react";
import {AppContext} from "@/app/_context/AppContext";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";
import {getPositionBreadcrumbs} from "@/app/members/[expaId]/position/[positionId]/PositionData";

export default function SurveyData({position, type}: { position: Position, type: string }) {
    const context = useContext(AppContext);
    const breadcrumbs = context!.breadcrumbs;
    useEffect(() => {
        breadcrumbs.set(getSurveyBreadcrumbs(position, type))
    }, []);
    return (<></>)
}

export function getSurveyBreadcrumbs(position: Position, type: string): Breadcrumb[] {
    let breadcrumbs = getPositionBreadcrumbs(position);
    breadcrumbs.push(
        {
            label: type,
            href: `/members/${position.person.id}/position/${position.id}/survey/initial`
        }
    );
    return breadcrumbs;

}
