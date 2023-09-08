import {NextRequest, NextResponse} from "next/server";
import {getTokensIfNecessary} from "@/_utils/auth_utils";

export async function middleware(request: NextRequest) {
    console.debug("Running middleware at", request.nextUrl.pathname);

    let tokens;
    try {
        tokens = await getTokensIfNecessary(request);
    } catch (e) {
        console.log(e);
        //return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
    }

    if (tokens != null) {
        const access_token = tokens.access_token;
        const refresh_token = tokens.refresh_token;
        const expires_in = tokens.expires_in;

        let requestHeaders = new Headers(request.headers);
        requestHeaders.set("Authorization", access_token);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });

        response.cookies.set("access_token", access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: expires_in
        });

        response.cookies.set("refresh_token", refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        return response;
    }

    if (request.cookies.get("access_token")) {
        let accessToken = request.cookies.get("access_token")!.value;
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("Authorization", accessToken);

        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/members/:path*", "/committees/:path*", "/profile"]
}