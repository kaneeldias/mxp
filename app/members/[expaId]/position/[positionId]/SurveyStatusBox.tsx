import React from "react";
import {SurveyStatuses} from "@/app/_types/SurveyTypes";
import MiniInfoCard from "@/app/_components/MiniInfoCard";
import SurveyStatusIndicator from "@/app/_components/SurveyStatusIndicator";
import {Position} from "@/app/_types/MemberTypes";

interface SurveyStatusBoxProps {
    expaId: string,
    positionId: string,
    position: Position
}

const getSurveyStatusInfo = async (expaId: string, positionId: string): Promise<SurveyStatuses> => {
    const url = new URL(`${process.env.BASE_URL}/api/survey/status`);
    url.searchParams.set("expaId", expaId);
    url.searchParams.set("positionId", positionId);

    const response: Response = await fetch(url.toString(), {cache: "no-cache"});

    if (response.status != 200) {
        console.log(await response.json());
        throw new Error("Unable to fetch survey status information.");
    }

    return await response.json();
}


export default async function SurveyStatusBox(props: SurveyStatusBoxProps) {
    const position = props.position;
    let surveyStatuses: SurveyStatuses | undefined;

    try {
        surveyStatuses = await getSurveyStatusInfo(props.expaId, props.positionId);
    } catch (e) {
        console.log(e);
    }

    return (
        <div className="space-y-8 bg-gray-100 p-5 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">Surveys</div>
            <div className="flex flex-row space-x-16">
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
