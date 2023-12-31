"use client"

import React, {useState} from "react";
import AButton from "@/app/_components/AButton";
import {CreateSurveyResponseRequest, SurveyType} from "@/app/_types/SurveyTypes";
import LoadingOverlay from "@/app/_components/LoadingOverlay";
import InitialSurvey from "@/app/members/[expaId]/position/[positionId]/survey/[type]/InitialSurvey";
import {Position} from "@/app/_types/MemberTypes";
import FinalSurvey from "@/app/members/[expaId]/position/[positionId]/survey/[type]/FinalSurvey";
import MidSurvey from "@/app/members/[expaId]/position/[positionId]/survey/[type]/MidSurvey";
import SuccessDialog from "@/app/_components/Dialogs/SuccessDialog";
import ErrorDialog from "@/app/_components/Dialogs/ErrorDialog";
import {checkAPIResponseForErrors} from "@/_utils/utils";

export default function Survey(props: {
    type: SurveyType,
    position: Position,
    surveyResponse: any,
    disabled: boolean
}) {
    const [loading, setLoading] = useState(false);

    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorDialogMessage, setErrorDialogMessage] = useState("Unable to submit your survey response. :(");

    const handleSuccessDialogClose = () => {
        setSuccessDialog(false);
        window.location.href = `/members/${props.position.person.id}/position/${props.position.id}`;
    };

    const handleErrorDialogClose = () => {
        setErrorDialog(false);
    }

    const [surveyResponse, setSurveyResponse] = useState(props.surveyResponse ?? {})

    const submitSurvey = async () => {
        setLoading(true);

        const requestData: CreateSurveyResponseRequest = {
            survey: {
                type: props.type,
                expaId: props.position.person.id,
                positionId: props.position.id,
            },
            formValues: surveyResponse
        }

        const response = await fetch('/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        try {
            await checkAPIResponseForErrors(response);
            setSuccessDialog(true);
        } catch (e: any) {
            setErrorDialogMessage(e.message);
            setErrorDialog(true);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div
                className="bg-gray-100 inline-block p-8 md:p-10 m-5 md:m-5 rounded-lg relative md:space-y-8 mt-5 md:mt-0">

                {loading && <LoadingOverlay/>}

                <div className="text-xl md:text-3xl font-bold text-slate-700 flex flex-shrink-0">

                    {props.type == SurveyType.INITIAL && "Initial Survey"}
                    {props.type == SurveyType.MID && "Mid Survey"}
                    {props.type == SurveyType.FINAL && "Final Survey"}

                </div>

                {props.type == SurveyType.INITIAL &&
                    <InitialSurvey surveyResponse={surveyResponse} setSurveyResponse={setSurveyResponse}
                                   disabled={loading || props.disabled}/>}

                {props.type == SurveyType.MID &&
                    <MidSurvey surveyResponse={surveyResponse} setSurveyResponse={setSurveyResponse}
                               disabled={loading || props.disabled}/>}


                {props.type == SurveyType.FINAL &&
                    <FinalSurvey surveyResponse={surveyResponse} setSurveyResponse={setSurveyResponse}
                                 disabled={loading || props.disabled}/>}


                {!props.disabled &&
                    <div className="mt-5">
                        <AButton onClick={submitSurvey}></AButton>
                    </div>
                }

            </div>

            <SuccessDialog content="Your survey response has been recorded." open={successDialog}
                           handleClose={handleSuccessDialogClose}/>
            <ErrorDialog content={errorDialogMessage} open={errorDialog}
                         handleClose={handleErrorDialogClose}/>

        </>
    )
}

