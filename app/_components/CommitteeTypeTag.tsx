"use client"

import React from 'react';
import {Chip} from "@/_lib/tailwind-material";
import {color} from "@material-tailwind/react/types/components/chip";

type CommitteeTypeProps = {
    type: "LC" | "MC" | "AI" | "Region"
};

const buttonColours = {
    "LC": "blue",
    "MC": "green",
    "AI": "red",
    "Region": "purple"
}
export default function CommitteeTypeTag(props: CommitteeTypeProps) {

    return (
        <Chip value={props.type} color={buttonColours[props.type] as color}
              className="rounded justify-center" size="sm"/>
    );
};
