import {NextRequest, NextResponse} from "next/server";

const getAccessToken = async (code: string): Promise<any> => {
    const requestData = {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!,
        client_secret: process.env.AUTH_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI!,
        code: code
    }

    return await fetch("https://auth.aiesec.org/oauth/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    }).then(async (response) => {
        if (response.status != 200) {
            console.log(await response.json());
            throw new Error("Error getting access token");
        }
        return await response.json();
    }).catch((error) => {
        console.error(error);
        throw error;
    });
};

export async function GET(request: NextRequest) {
    const code: string = request.nextUrl.searchParams.get("code") as string;
    const authResponse = await getAccessToken(code);

    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/members`, {
        status: 302,
    });

    response.cookies.set("access_token", authResponse.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: authResponse.expires_in
    });
    response.cookies.set("refresh_token", authResponse.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    return response;
}