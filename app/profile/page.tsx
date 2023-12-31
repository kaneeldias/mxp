import {Member} from "@/app/_types/MemberTypes";
import {checkLoggedIn} from "@/_utils/auth_utils";
import {getCurrentPerson} from "@/app/api/member/current/route";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function Profile() {
    let profile: Member = {} as Member
    if (checkLoggedIn()) {
        profile = await getCurrentPerson(headers().get("Authorization")!);
        redirect(`/members/${profile.id}`)
    } else {
        redirect("/auth/login")
    }

}
