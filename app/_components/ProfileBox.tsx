import React from 'react';
import {Member} from "@/app/_types/MemberTypes";
import {headers} from "next/headers";
import Link from "next/link";
import {checkLoggedIn} from "@/_utils/auth_utils";
import {Avatar} from "@/_lib/tailwind-material";
import {getCurrentPerson} from "@/app/api/member/current/route";

export default async function ProfileBox() {
    let profile: Member = {} as Member
    if (checkLoggedIn()) {
        profile = await getCurrentPerson(headers().get("Authorization")!);
    }

    return (
        <div className="flex flex-row justify-center items-stretch mr-2">
            {profile && profile.profile_photo &&
                <>
                    <div className="w-5 h-5 md:w-8 md:h-8 relative">
                        <Link href={`/members/${profile.id}`}>
                            <Avatar src={profile.profile_photo!}
                                    alt={`Profile photo for ${profile.full_name}`}
                                    variant="rounded"
                                    className="md:w-8 md:h-8 w-5 h-5 cursor-pointer"
                            />
                        </Link>
                    </div>
                </>
            }
        </div>
    );
};
