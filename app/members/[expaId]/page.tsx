import {Member, MemberInfoResponse, Position} from "@/app/_types/MemberTypes";
import MemberPositionCard from "@/app/_components/MemberPositionCard";
import MemberInfoCard from "@/app/_components/MemberInfoCard";
import Link from 'next/link'
import {sortMemberPositions} from "@/utils/utils";
import React from "react";
import MemberData from "@/app/members/[expaId]/MemberData";

export let metadata = {
    title: 'AIESEC Member'
}
const getMemberInfo = async (expaId: string): Promise<MemberInfoResponse> => {
    const url = new URL(`${process.env.BASE_URL}/api/member`);
    url.searchParams.set("expaId", expaId);

    const response: Response = await fetch(url.toString(), {cache: "no-cache"});

    if (response.status != 200) {
        console.log(await response.json());
        throw new Error("Unable to fetch member information.");
    }

    return await response.json();
};

export default async function MemberInfo({params}: { params: { expaId: string } }) {
    let memberInfo: Member | undefined;

    // let breadcrumbs: Breadcrumb[] = getMembersStartBreadcrumbs();

    try {
        const memberInfoResponse: MemberInfoResponse = await getMemberInfo(params.expaId);
        memberInfoResponse.data.member_positions = sortMemberPositions(memberInfoResponse.data.member_positions!);
        memberInfo = memberInfoResponse.data;
        metadata.title = `${memberInfo.full_name} | AIESEC Member`;
    } catch (e) {
        console.log(e);
    }

    return (
        <>
            <MemberData member={memberInfo!}/>

            <div className="m-5 flex justify-center w-full">

                {memberInfo != undefined &&
                    <div className="flex flex-row rounded-md justify-start items-start w-full space-x-10 p-10">

                        <div className="flex-shrink-0">
                            <MemberInfoCard member={memberInfo}/>
                        </div>

                        <div className="flex-grow items-center justify-center">

                            {(memberInfo.member_positions && memberInfo.member_positions.length != 0) ? (
                                <div className="mt-3 flex-col">
                                    <div className="text-3xl font-bold text-gray-800 mb-5">Positions</div>

                                    {memberInfo.member_positions.map((position: Position) => (
                                        <Link href={`/members/${memberInfo?.id}/position/${position.id}`}
                                              key={position.id}>
                                            <MemberPositionCard position={position}/>
                                        </Link>
                                    ))
                                    }
                                </div>
                            ) : (
                                <div className="mt-10">
                                    No positions found.
                                </div>
                            )
                            }
                        </div>
                    </div>
                }

                {memberInfo == undefined &&
                    <div>
                        Unable to fetch member information.
                    </div>
                }

            </div>
        </>
    )
}
