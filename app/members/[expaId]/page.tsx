import {Member, Position} from "@/app/_types/MemberTypes";
import MemberPositionCard from "@/app/_components/MemberPositionCard";
import MemberInfoCard from "@/app/_components/MemberInfoCard";
import Link from 'next/link'
import {sortMemberPositions} from "@/_utils/utils";
import React from "react";
import MemberData from "@/app/members/[expaId]/MemberData";
import {headers} from "next/headers";
import {getMemberInfo} from "@/app/api/member/route";

export let metadata = {
    title: 'AIESEC Member'
}

export default async function MemberInfo({params}: { params: { expaId: string } }) {
    const memberInfo: Member = await getMemberInfo(params.expaId, headers().get("Authorization")!)

    memberInfo.member_positions = sortMemberPositions(memberInfo.member_positions!);
    metadata.title = `${memberInfo.full_name} | AIESEC Member`;

    return (
        <>
            <MemberData member={memberInfo!}/>

            <div className="p-2 md:p-5 flex justify-center w-full">

                <div
                    className="flex flex-col md:flex-row rounded-md justify-start items-start w-full md:space-x-10 md:p-10 p-4">

                    <div className="flex-shrink-0">
                        <MemberInfoCard member={memberInfo}/>
                    </div>

                    <div className="md:flex-grow items-center justify-center">

                        {(memberInfo.member_positions && memberInfo.member_positions.length != 0) ? (
                            <div className="mt-10 md:mt-3 flex-col">
                                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">Positions</div>

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


            </div>
        </>
    )
}
