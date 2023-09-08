import React from 'react';
import {CommitteeService, Department} from "@/_services/CommitteeService";
import {headers} from "next/headers";
import CommitteeDepartmentsList from "@/app/committees/[committeeId]/CommitteeDepartmentList";

export default async function CommitteeDepartments({committeeId, termId}: { committeeId: string; termId: string }) {
    const committeeService = new CommitteeService(headers().get("Authorization")!);
    const departments: Department[] = await committeeService.getDepartments(committeeId, termId);

    return (
        <>
            <div className="md:text-xl font-bold text-gray-600">Membership</div>

            <CommitteeDepartmentsList departments={departments}/>
        </>
    );
};
