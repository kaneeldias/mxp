export type Member = {
    id: string,
    full_name: string,
    home_lc?: {
        full_name: string;
    },
    home_mc?: {
        full_name: string;
    },
    is_aiesecer?: boolean,
    contact_detail?: {
        email: string;
        country_code: string;
        phone: string
    },
    profile_photo?: string,
    member_positions?: Position[],
}

export type Paging = {
    total_items: number;
    total_pages: number;
    current_page: number;
}

export type MemberResponse = {
    paging: Paging;
    data: Member[];
}

export type MemberInfoResponse = {
    data: Member;
}

export type Position = {
    id: string;
    title: string;
    function: {
        name: string;
    };
    role: {
        name: string;
    };
    status: string;
    start_date: string;
    end_date: string;
    duration: {
        name: string;
    }
    committee_department: {
        name: string;
    };
    term: {
        name: string;
    }
    office: {
        full_name: string;
    }
    person: {
        id: string;
        full_name: string;
        profile_photo: string;
    }
    reports_to: {
        id: string;
        full_name: string;
        profile_photo: string;
    }
}

export type PositionInfoResponse = {
    data: Position;
}