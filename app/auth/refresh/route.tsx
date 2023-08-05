import {NextRequest, NextResponse} from "next/server";

const getAccessToken = async (refreshToken: string): Promise<any> => {
    const requestData = {
        grant_type: "refresh_token",
        client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!,
        client_secret: process.env.AUTH_CLIENT_SECRET!,
        refresh_token: refreshToken
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
    const refreshToken: string = request.nextUrl.searchParams.get("refresh_token") as string;
    const authResponse = await getAccessToken(refreshToken);
    console.log(authResponse);

    const response = NextResponse.json({
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_in: authResponse.expires_in,
    });
    return response;
}