import {Paging} from "@/app/_types/MemberTypes";

export interface Committee {
    id: string;
    full_name: string;
    address_detail?: {
        country: string;
    };
    tag?: string
}

export type CommitteesResponse = {
    paging: Paging;
    data: Committee[];
}
