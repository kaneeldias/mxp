import {Position} from "@/app/_types/MemberTypes";
import React from "react";
import {SurveyType} from "@/app/_types/SurveyTypes";
import PositionInfoBox from "@/app/_components/PositionInfoBox";
import SurveyData from "@/app/members/[expaId]/position/[positionId]/survey/SurveyData";
import Survey from "@/app/members/[expaId]/position/[positionId]/survey/[type]/Survey";
import {canSurveyBeFilled} from "@/_utils/utils";
import {getPosition} from "@/app/api/position/route";
import {headers} from "next/headers";
import {getSurveyResponse} from "@/app/api/survey/route";
import {getCurrentPerson} from "@/app/api/member/current/route";

export let metadata = {
    title: 'AIESEC Member'
}
// const getPositionInfo = async (positionId: string): Promise<PositionInfoResponse> => {
//     const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/position`);
//     url.searchParams.set("positionId", positionId);
//
//     const response: Response = await fetch(url.toString(), {
//         cache: "no-cache",
//         headers: {
//             'Authorization': await getAccessToken()
//         }
//     });
//
//     await checkAPIResponseForErrors(response);
//
//     return await response.json();
// };
//
// const getSurveyResponse = async (expaId: string, positionId: string, type: SurveyType): Promise<any> => {
//     const url = new URL(`${process.env.BASE_URL}/api/survey`);
//     url.searchParams.set("expaId", expaId);
//     url.searchParams.set("positionId", positionId);
//     url.searchParams.set("type", type);
//
//     const response: Response = await fetch(url.toString(), {
//         cache: "no-cache",
//         headers: {
//             'Authorization': await getAccessToken()
//         }
//     });
//
//     await checkAPIResponseForErrors(response);
//
//     return await response.json();
// };


export default async function InitialSurveyPage({params}: {
    params: { expaId: string, positionId: string, type: SurveyType }
}) {

    //check if params.type is of type SurveyType
    if (!Object.values(SurveyType).includes(params.type)) {
        throw new Error("Invalid survey type.");
    }

    const position: Position = await getPosition(params.positionId, headers().get("Authorization")!);
    metadata.title = `${position.title} | ${position.person.full_name} | AIESEC Member`;

    const surveyResponse = await getSurveyResponse(params.expaId, params.positionId, params.type);

    const profile = await getCurrentPerson(headers().get("Authorization")!);
    const canBeFilled = canSurveyBeFilled(params.type, position.start_date, position.end_date);
    const disabled = (profile.id != position.person.id) || !canBeFilled;

    return (
        <>
            <SurveyData position={position} type={params.type}/>

            <div className="md:p-10 inline-flex flex-col md:flex-row md:space-x-10">

                <div className="block md:hidden">
                    <PositionInfoBox position={position}/>
                </div>

                <Survey position={position} surveyResponse={surveyResponse} type={params.type} disabled={disabled}/>

                <div className="hidden md:block">
                    <PositionInfoBox position={position}/>
                </div>


            </div>


        </>
    )
}

