"use client"

import React, {useState} from 'react';
import {Department, Team} from "@/_services/CommitteeService";
import {Accordion, AccordionBody, AccordionHeader} from "@/_lib/tailwind-material";
import MemberChip from "@/app/_components/MemberChip";

const CUSTOM_ANIMATION = {
    mount: {scale: 1},
    unmount: {scale: 0.9},
};

export default function CommitteeDepartmentsList({departments}: { departments: Department[] }) {
    const [open, setOpen] = useState(-1);
    const handleOpen = (value: number) => setOpen(open === value ? -1 : value);

    return (
        <>
            {departments.map((department: Department, index: number) => (
                <Accordion key={index}
                           open={open === index}
                           animate={CUSTOM_ANIMATION}
                           icon={<Icon id={index} open={open}/>}
                >
                    <AccordionHeader
                        onClick={() => handleOpen(index)}
                        className={`text-sm hover:text-aiesec-blue ${open === index ? "text-aiesec-blue" : ""} transition-all duration-300`}
                    >
                        {department.name} ({getDepartmentMembershipCount(department)})
                    </AccordionHeader>
                    <AccordionBody>
                        <div className={"space-y-6 md:space-y-8"}>
                            {department.functions.map((func, index) => (<div key={index}>
                                {func.vicePresident && <div className="md:inline-block">
                                    <div className="text-sm font-bold">{func.vicePresident.title}</div>
                                    <MemberChip member={func.vicePresident} truncateName={false}/>
                                </div>}

                                {func.teams.map((team: Team, index: number) => (
                                    <div key={index}
                                         className="flex flex-col md:flex-row py-2 my-3 border-2 border-gray-200 p-3 rounded-md border-dashed space-y-3 md:space-x-10">
                                        {team.teamLeader && <div className="md:w-1/2">
                                            <div className="text-sm font-bold">{team.teamLeader.title}</div>
                                            <MemberChip member={team.teamLeader} truncateName={false}/>
                                        </div>}
                                        <div className="text-xs ml-3 space-y-2 flex flex-col md:w-1/2">
                                            {team.members.map((member, index) => (<div key={index}>
                                                <div className="text-xs">{member.title}</div>
                                                <MemberChip key={index} member={member} truncateName={false}/>
                                            </div>))}
                                        </div>
                                    </div>))
                                }
                            </div>))}
                        </div>
                    </AccordionBody>
                </Accordion>
            ))}
        </>
    );
};

function Icon({id, open}: { id: number, open: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>
    );
}

function getDepartmentMembershipCount(department: Department) {
    let memberIds: string[] = [];
    department.functions.forEach(func => {
        func.teams.forEach(team => {
            memberIds = memberIds.concat(team.members.map(member => member.id));
            if (team.teamLeader) {
                memberIds.push(team.teamLeader.id);
            }
        });
        if (func.vicePresident) {
            memberIds.push(func.vicePresident.id);
        }
    });
    return new Set(memberIds).size;
}