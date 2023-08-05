"use client"

import React, {Dispatch, SetStateAction} from "react";
import {Rating} from "@/lib/mui";
import {InitialSurveyResponse} from "@/app/_types/SurveyTypes";

export default function InitialSurvey(props: {
    surveyResponse: InitialSurveyResponse,
    setSurveyResponse: Dispatch<SetStateAction<any>>
    disabled: boolean
}) {

    return (
        <>

            <div className="mt-5 space-y-2">
                <div className="text-md md:text-xl">How would you rate this experience?</div>
                <Rating name="customized-10" max={10} size="large" defaultValue={props.surveyResponse?.nps ?? 0}
                        disabled={props.disabled}
                        onChange={(event, newValue) => {
                            props.setSurveyResponse((prevState: InitialSurveyResponse) => ({
                                ...prevState,
                                nps: newValue || 0
                            }));
                        }}
                />
            </div>

            <div className="mt-5 space-y-2">
                <div className="text-md md:text-xl">Did it develop your leadership skills?</div>
                <Rating name="customized-10" max={10} size="large" defaultValue={props.surveyResponse?.lps ?? 0}
                        disabled={props.disabled}
                        onChange={(event, newValue) => {
                            props.setSurveyResponse((prevState: InitialSurveyResponse) => ({
                                ...prevState,
                                lps: newValue || 0
                            }));
                        }}
                />
            </div>

        </>
    )
}

