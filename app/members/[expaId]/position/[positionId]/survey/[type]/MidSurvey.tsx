"use client"

import React, {Dispatch, SetStateAction} from "react";
import {Rating} from "@/_lib/mui";
import {FinalSurveyResponse, MidSurveyResponse} from "@/app/_types/SurveyTypes";
import {TextField} from "@mui/material";

export default function MidSurvey(props: {
    surveyResponse: MidSurveyResponse
    setSurveyResponse: Dispatch<SetStateAction<any>>
    disabled: boolean
}) {

    return (
        <>

            <div className="mt-5 space-y-2">
                <div className="text-md md:text-xl">Why are you filling this survey??</div>
                <TextField defaultValue={props.surveyResponse?.why ?? ""}
                           disabled={props.disabled}
                           className="flex bg-white p20"
                           onChange={(event) => {
                               props.setSurveyResponse((prevState: MidSurveyResponse) => ({
                                   ...prevState,
                                   why: event.target.value || ""
                               }));
                           }}
                />
            </div>

            <div className="mt-5 space-y-2">
                <div className="text-md md:text-xl">Did it develop your leadership skills?</div>
                <Rating name="customized-10" max={10} size="large" defaultValue={props.surveyResponse?.lps ?? 0}
                        disabled={props.disabled}
                        onChange={(event, newValue) => {
                            props.setSurveyResponse((prevState: FinalSurveyResponse) => ({
                                ...prevState,
                                lps: newValue || 0
                            }));
                        }}
                />
            </div>

        </>
    )
}

