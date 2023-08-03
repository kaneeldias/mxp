"use client"

import {Position} from "@/app/_types/MemberTypes";
import React, {useState} from "react";
import {Rating} from "@/lib/mui";
import AButton from "@/app/_components/AButton";
import {CreateSurveyResponseRequest, InitialSurveyResponse} from "@/app/_types/SurveyTypes";
import LoadingOverlay from "@/app/_components/LoadingOverlay";
import {Alert, Snackbar} from "@mui/material";

export default function InitialSurvey(props: { position: Position, surveyResponse: InitialSurveyResponse }) {
    const [nps, setNps] = useState(props.surveyResponse?.nps ?? 0);
    const [lps, setLps] = useState(props.surveyResponse?.lps ?? 0);

    const [loading, setLoading] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const submitSurvey = async () => {
        setLoading(true);

        const requestData: CreateSurveyResponseRequest = {
            survey: {
                type: "initial",
                expaId: props.position.person.id,
                positionId: props.position.id,
            },
            formValues: {
                nps: nps,
                lps: lps
            }
        }

        await fetch('/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then(async (response) => {
            if (response.status != 200) {
                console.log(await response.json());
                setErrorSnackbar(true);
                return;
            }
            setSuccessSnackbar(true);
        }).catch((error) => {
            console.error(error);
            setErrorSnackbar(true);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <div className="mt-10 bg-slate-100 inline-block p-5 rounded-lg relative">

                {loading && <LoadingOverlay/>}


                <div className="text-3xl font-bold text-slate-700">Initial Survey</div>
                <div className="mt-5">
                    <div className="text-sm">How would you rate this experience?</div>
                    <Rating name="customized-10" max={10} size="large" defaultValue={nps} disabled={loading}
                            onChange={(event, newValue) => setNps(newValue || 0)}/>
                </div>

                <div className="mt-5">
                    <div className="text-sm">Did it develop your leadership skills?</div>
                    <Rating name="customized-10" max={10} size="large" defaultValue={lps} disabled={loading}
                            onChange={(event, newValue) => {
                                event.preventDefault();
                                setLps(newValue || 0)
                            }}
                    />
                </div>

                <div className="mt-5">
                    <AButton onClick={submitSurvey}></AButton>
                </div>

            </div>

            <Snackbar
                open={successSnackbar}
                autoHideDuration={6000}
                onClose={() => setSuccessSnackbar(false)}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                <Alert severity="success" sx={{width: '100%'}}>
                    Survey updated.
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                onClose={() => setErrorSnackbar(false)}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                <Alert severity="error" sx={{width: '100%'}}>
                    Survey update failed.
                </Alert>
            </Snackbar>
        </>
    )
}

