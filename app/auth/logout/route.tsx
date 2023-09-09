import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`, {status: 302});
}
