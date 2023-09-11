"use client"

import React from 'react';
import Link from "next/link";
import {Committee} from "@/app/_types/CommitteeTypes";
import {convertTerm, removeAiesecInPrefix} from "@/_utils/utils";

const colors = {
    "LC": ["bg-blue-600", "text-blue-900", "border-blue-800"],
    "MC": ["bg-green-600", "text-green-900", "border-green-800"],
    "AI": ["bg-red-600", "text-red-600", "border-red-800"],
    "Region": ["bg-purple-600", "text-purple-600", "border-purple-800"]
}

export default function CommitteeChip(props: { committee: Committee, term?: string, showPrefix?: boolean }) {
    const committee: Committee = props.committee;
    const term: string | undefined = props.term;
    const showPrefix: boolean = props.showPrefix ?? true;

    let baseColor = "gray";
    let textColor = "text-grey-900";
    let borderColor = "border-gray-900";
    if (committee.tag === "LC" || committee.tag === "MC" || committee.tag === "AI" || committee.tag === "Region") {
        baseColor = colors[committee.tag][0];
        textColor = colors[committee.tag][1];
        borderColor = colors[committee.tag][2];
    }

    return (
        <div className="inline-block">
            <Link href={`/committees/${committee.id}`}>
                <div
                    className={`flex ${baseColor} ${textColor} ${borderColor} overflow-hidden whitespace-nowrap text-sm font-bold border-[1px] bg-opacity-20 inline-block rounded-lg p-1 px-2 hover:bg-opacity-100 hover:text-white transition-all duration-300`}>
                    {showPrefix && committee.full_name}
                    {!showPrefix && removeAiesecInPrefix(committee.full_name)}
                    {" "}
                    {term && convertTerm(term)}
                </div>
            </Link>
        </div>
    );
};
