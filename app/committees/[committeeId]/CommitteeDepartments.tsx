import React from 'react';
import {CommitteeService, Department, President} from "@/_services/CommitteeService";
import {headers} from "next/headers";
import CommitteeDepartmentsList from "@/app/committees/[committeeId]/CommitteeDepartmentList";

export default async function CommitteeDepartments({committeeId, termId, president}: {
    committeeId: string;
    termId: string;
    president: President | null;
}) {
    const committeeService = new CommitteeService(headers().get("Authorization")!);
    const departments: Department[] = await committeeService.getDepartments(committeeId, termId);

    return (
        <>
            <div className="md:text-xl font-bold text-gray-600">Membership ({getMembershipCount(departments, president)})
            </div>

            <CommitteeDepartmentsList departments={departments}/>
        </>
    );
};

function getMembershipCount(departments: Department[], president: President | null) {
    let memberIds: string[] = [];

    if (president) {
        memberIds.push(president.id);
    }

    departments.forEach(department => {
        department.functions.forEach(func => {
            if (func.vicePresident) {
                memberIds.push(func.vicePresident.id);
            }

            func.teams.forEach(team => {
                if (team.teamLeader) {
                    memberIds.push(team.teamLeader.id);
                }
                memberIds = memberIds.concat(team.members.map(member => member.id));
            });
        });
    });
    return new Set(memberIds).size;
}