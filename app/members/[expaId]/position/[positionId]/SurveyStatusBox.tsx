import React from "react";
import {SurveyStatuses} from "@/app/_types/SurveyTypes";
import MiniInfoCard from "@/app/_components/MiniInfoCard";
import SurveyStatusIndicator from "@/app/_components/SurveyStatusIndicator";
import {Position} from "@/app/_types/MemberTypes";
import {headers} from "next/headers";
import {getSurveyStatuses} from "@/app/api/survey/status/route";

interface SurveyStatusBoxProps {
    expaId: string,
    positionId: string,
    position: Position
}

export default async function SurveyStatusBox(props: SurveyStatusBoxProps) {
    const position = props.position;
    let surveyStatuses: SurveyStatuses = await getSurveyStatuses(props.expaId, props.positionId, headers().get("Authorization")!);

    return (
        <div className="space-y-4 md:space-y-8 bg-gray-100 p-5 rounded-lg mr-5">
            <div className="text-xl md:text-2xl font-bold text-gray-800">Surveys</div>
            <div className="flex flex-row space-x-4 md:space-x-16">
                {surveyStatuses?.initial &&
                    <MiniInfoCard title="Initial"
                                  link={`/members/${position?.person.id}/position/${position?.id}/survey/initial`}
                                  value={(<SurveyStatusIndicator type={surveyStatuses.initial}/>)}/>}

                {surveyStatuses?.mid &&
                    <MiniInfoCard title="Mid"
                                  link={`/members/${position?.person.id}/position/${position?.id}/survey/mid`}
                                  value={(<SurveyStatusIndicator type={surveyStatuses.mid}/>)}/>}

                {surveyStatuses?.final &&
                    <MiniInfoCard title="Final"
                                  link={`/members/${position?.person.id}/position/${position?.id}/survey/final`}
                                  value={(<SurveyStatusIndicator type={surveyStatuses.final}/>)}/>}
            </div>
        </div>
    )
}
