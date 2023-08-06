"use client"

import React, {Dispatch, SetStateAction} from "react";
import {Rating} from "@/_lib/mui";
import {FinalSurveyResponse} from "@/app/_types/SurveyTypes";
import {TextField} from "@mui/material";

export default function FinalSurvey(props: {
    surveyResponse: FinalSurveyResponse
    setSurveyResponse: Dispatch<SetStateAction<any>>
    disabled: boolean
}) {

    return (
        <>

            <div className="mt-5 space-y-2">
                <div className="text-xl">What was your favourite part of the experience?</div>
                <TextField defaultValue={props.surveyResponse?.experience ?? ""}
                           disabled={props.disabled}
                           className="flex bg-white"
                           onChange={(event) => {
                               props.setSurveyResponse((prevState: FinalSurveyResponse) => ({
                                   ...prevState,
                                   experience: event.target.value || ""
                               }));
                           }}
                />
            </div>

            <div className="mt-5 space-y-2">
                <div className="text-xl">Did it develop your leadership skills?</div>
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

