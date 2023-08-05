import {Position, PositionInfoResponse} from "@/app/_types/MemberTypes";
import MiniInfoCard from "@/app/_components/MiniInfoCard";
import {convertDateToReadable} from "@/utils/utils";
import React from "react";
import SurveyStatusBox from "@/app/members/[expaId]/position/[positionId]/SurveyStatusBox";
import PositionInfoBox from "@/app/_components/PositionInfoBox";
import PositionData from "@/app/members/[expaId]/position/[positionId]/PositionData";
import {getAccessToken} from "@/utils/auth_utils";

export let metadata = {
    title: 'AIESEC Member'
}
const getPositionInfo = async (positionId: string): Promise<PositionInfoResponse> => {
    const url = new URL(`${process.env.BASE_URL}/api/position`);
    url.searchParams.set("positionId", positionId);

    const response: Response = await fetch(url.toString(), {
        cache: "no-cache",
        headers: {
            'Authorization': await getAccessToken()
        }
    });

    if (response.status != 200) {
        console.log(await response.json());
        throw new Error("Unable to fetch position information.");
    }

    return await response.json();
};

export default async function PositionInfo({params}: { params: { expaId: string, positionId: string } }) {
    let position: Position | undefined;

    try {
        const positionInfoResponse: PositionInfoResponse = await getPositionInfo(params.positionId);
        position = positionInfoResponse.data;
        metadata.title = `${position.title} | ${position.person.full_name} | AIESEC Member`;
    } catch (e) {
        console.log(e);
    }

    return (
        <>
            <PositionData position={position!}/>

            <div className="md:p-[40px]">
                <PositionInfoBox position={position!}/>

                <div
                    className="ml-6 md:ml-[215px] flex flex-col md:flex-row md:space-x-16 mt-5 space-y-10 md:space-y-0">
                    <div className="flex flex-col space-y-3 md:space-y-8">
                        <div className="text-xl md:text-2xl font-bold text-gray-800">Position Info</div>

                        {position?.role?.name && <MiniInfoCard title="Role" value={position.role.name}/>}
                        {position?.committee_department?.name &&
                            <MiniInfoCard title="Department" value={position.committee_department.name}/>}
                        {position?.function?.name && <MiniInfoCard title="Function" value={position.function.name}/>}
                        {position?.duration?.name && <MiniInfoCard title="Duration" value={position.duration.name}/>}

                        <div className="flex flex-row space-x-5 md:space-x-10">
                            {position?.start_date &&
                                <MiniInfoCard title="Start date" value={convertDateToReadable(position.start_date)}/>}
                            {position?.end_date &&
                                <MiniInfoCard title="End date" value={convertDateToReadable(position.end_date)}/>}
                        </div>

                        {position?.reports_to && <MiniInfoCard title="Team leader" value={position.reports_to.full_name}
                                                               image={position.reports_to.profile_photo}
                                                               link={`/members/${position.reports_to.id}`}/>}
                    </div>

                    <div>
                        <SurveyStatusBox position={position!} expaId={params.expaId} positionId={params.positionId}/>
                    </div>

                </div>
            </div>


        </>
    )
}
