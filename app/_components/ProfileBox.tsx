import React from 'react';
import {Member} from "@/app/_types/MemberTypes";
import {headers} from "next/headers";
import Link from "next/link";
import {checkLoggedIn} from "@/_utils/auth_utils";
import {Avatar} from "@/_lib/tailwind-material";

export async function getCurrentPerson(): Promise<Member> {
    const url = new URL(`${process.env.BASE_URL}/api/member/current`);

    const response: Response = await fetch(url.toString(), {
        headers: {
            "Authorization": headers().get("Authorization") ?? ""
        }
    });

    if (response.status != 200) {
        console.log(await response.json());
        throw new Error("Unable to fetch current person information.");
    }

    return await response.json();
}

export default async function ProfileBox() {
    let profile: Member = {} as Member
    if (checkLoggedIn()) {
        profile = await getCurrentPerson();
    }

    return (
        <div className="flex flex-row justify-center items-stretch mr-2">
            {profile && profile.profile_photo &&
                <>
                    <div className="w-5 h-5 md:w-10 md:h-10 relative">
                        <Link href={`/members/${profile.id}`}>
                            <Avatar src={profile.profile_photo!}
                                    alt={`Profile photo for ${profile.full_name}`}
                                    size="md"
                                    variant="rounded"
                            />
                        </Link>
                    </div>
                </>
            }
        </div>
    );
};
