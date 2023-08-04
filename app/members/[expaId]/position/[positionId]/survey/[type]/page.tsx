import {Position, PositionInfoResponse} from "@/app/_types/MemberTypes";
import React from "react";
import {InitialSurveyResponse, SurveyType} from "@/app/_types/SurveyTypes";
import PositionInfoBox from "@/app/_components/PositionInfoBox";
import SurveyData from "@/app/members/[expaId]/position/[positionId]/survey/SurveyData";
import InitialSurvey from "@/app/members/[expaId]/position/[positionId]/survey/[type]/InitialSurvey";

export let metadata = {
    title: 'AIESEC Member'
}
const getPositionInfo = async (positionId: string): Promise<PositionInfoResponse> => {
    const url = new URL("http://127.0.0.1:3000/api/position");
    url.searchParams.set("positionId", positionId);

    const response: Response = await fetch(url.toString(), {cache: "force-cache"});

    if (response.status != 200) {
        console.log(await response.json());
        throw new Error("Unable to fetch position information.");
    }

    return await response.json();
};

const getSurveyResponse = async (expaId: string, positionId: string, type: SurveyType): Promise<InitialSurveyResponse> => {
    const url = new URL(`${process.env.BASE_URL}/api/survey`);
    url.searchParams.set("expaId", expaId);
    url.searchParams.set("positionId", positionId);
    url.searchParams.set("type", type);

    const response: Response = await fetch(url.toString(), {cache: "no-cache"});

    if (response.status != 200) {
        console.log(await response.json());
        throw new Error("Unable to fetch position information.");
    }

    return await response.json();
};


export default async function InitialSurveyPage({params}: {
    params: { expaId: string, positionId: string, type: SurveyType }
}) {
    let position: Position | undefined;
    let surveyResponse: InitialSurveyResponse | undefined;

    try {
        const positionInfoResponse: PositionInfoResponse = await getPositionInfo(params.positionId);
        position = positionInfoResponse.data;

        metadata.title = `${position.title} | ${position.person.full_name} | AIESEC Member`;
    } catch (e) {
        console.log(e);
    }

    try {
        surveyResponse = await getSurveyResponse(params.expaId, params.positionId, params.type);
    } catch (e) {
        console.log(e);
    }

    return (
        <>
            <SurveyData position={position!} type={params.type}/>

            <div className="p-10 inline-flex flex-row space-x-10">
                <div>
                    <PositionInfoBox position={position!}/>
                </div>

                {params.type === SurveyType.INITIAL &&
                    <InitialSurvey position={position!} surveyResponse={surveyResponse!}/>}

            </div>


        </>
    )
}

