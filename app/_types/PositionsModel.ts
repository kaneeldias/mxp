import {Member} from "@/app/_types/MemberTypes";

export interface Team {
    name: string;
    leader?: Member;
    members?: Member[];
    duration: Duration;

    belongsTo: DepartmentInstance | LocalCommittee | MemberCommittee | RegionalOffice | AIESECInternationalOffice;
}

export interface Department {
    name: string;
    instances: DepartmentInstance[];

    head: VicePresident;
    term: OfficeTerm;
}

export interface DepartmentInstance {
    name: string;
    teams: Team[];

    department: Department;
}

export interface LocalCommittee {
    name: string;
    terms: OfficeTerm[];
    teams: Team[];

    memberCommittee: MemberCommittee;
}

export interface MemberCommittee {
    name: string;
    terms: OfficeTerm[];
    teams: Team[];

    regionalOffice: RegionalOffice;
    localCommittees: LocalCommittee[];
}

export interface RegionalOffice {
    name: string;
    terms: OfficeTerm[];
    teams: Team[];

    aiesecInternationalOffice: AIESECInternationalOffice;
    memberCommittees: MemberCommittee[];
}

export interface AIESECInternationalOffice {
    name: string;
    terms: OfficeTerm[];
    teams: Team[];

    regionalOffices: RegionalOffice[],
}

export interface Duration {
    start: Date;
    end: Date;
}

export interface OfficeTerm {
    name: string;
    duration: Duration;
    president: Member;
    vicePresidents: VicePresident[];
    
    office: LocalCommittee | MemberCommittee | RegionalOffice | AIESECInternationalOffice;
}

export interface VicePresident {
    member: Member;
    departments: Department[];
}