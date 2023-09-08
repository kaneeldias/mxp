import React, {Suspense} from "react";
import {CommitteeService} from "@/_services/CommitteeService";
import {headers} from "next/headers";
import PresidentBox from "@/app/_components/PresidentBox";
import VicePresidentBox from "@/app/_components/VicePresidentBox";
import CommitteeData from "@/app/committees/[committeeId]/CommitteeData";
import CommitteeTypeTag from "@/app/_components/CommitteeTypeTag";
import CommitteeDepartments from "@/app/committees/[committeeId]/CommitteeDepartments";
import {CircularProgress} from "@mui/material";


export default async function Committee({params}: { params: { committeeId: string } }) {
    const committeeService = new CommitteeService(headers().get("Authorization")!);
    const committee = await committeeService.getCommittee(params.committeeId);
    const eb = await committeeService.getEB(params.committeeId, "22138");

    return (
        <>
            <CommitteeData committee={committee}/>

            <div>
                <div className={"flex flex-row space-x-4"}>
                    <div className="text-xl md:text-3xl font-bold text-gray-800">{committee.full_name}</div>
                    <CommitteeTypeTag type={committee.tag as "LC" | "MC" | "AI"}/>
                </div>
                <div className="text-md md:text-xl text-gray-600">{committee.address_detail?.country}</div>
            </div>

            <div className="flex flex-col md:flex-col w-fit">

                {eb.president &&
                    <div className={"flex mt-10"}>
                        <PresidentBox president={eb.president}/>
                    </div>
                }
            </div>

            <div className="flex flex-col md:flex-row md:space-x-10">

                <div className="flex flex-col md:flex-col mt-10">
                    <div className="md:text-xl font-bold text-gray-600">Vice Presidents</div>
                    <div
                        className="flex flex-row flex-wrap">
                        {eb.vicePresidents.map((vp, index) => (
                            <div key={index} className="flex w-1/2 md:w-1/4">
                                <VicePresidentBox vicePresident={vp}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="mt-10 flex-col md:inline-block md:min-w-[600px] min-h-[200px] border-2 border-solid border-gray-200 p-4 bg-gradient-to-b">
                    <Suspense fallback={
                        <>
                            <div className="md:text-xl font-bold text-gray-600 mb-5">Membership</div>
                            <div className="flex flex-col py-5 justify-center items-center h-full w-full">
                                <CircularProgress/>
                            </div>
                        </>
                    }>
                        <CommitteeDepartments committeeId={params.committeeId} termId="22138"/>
                    </Suspense>
                </div>
            </div>

        </>
    )
}
