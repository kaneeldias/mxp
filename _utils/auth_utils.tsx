import {cookies} from "next/headers";
import {NextRequest} from "next/server";

export async function getAccessToken(): Promise<any> {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("access_token");

    if (accessToken && accessToken.value && accessToken.value !== "" && accessToken.value !== null) {
        return accessToken.value;
    }

    throw new Error("No access token found :(");
}

export async function getTokensIfNecessary(request: NextRequest): Promise<any> {
    let accessToken = request.cookies.get("access_token");
    if (accessToken && accessToken.value && accessToken.value !== "" && accessToken.value !== null) {
        return;
    }

    let refresh_token = request.cookies.get("refresh_token");
    if (refresh_token && refresh_token.value && refresh_token.value !== "" && refresh_token.value !== null) {
        const url = new URL(`${process.env.BASE_URL}/auth/refresh`);
        url.searchParams.set("refresh_token", refresh_token.value);

        const response: Response = await fetch(url.toString(), {});

        if (response.status != 200) {
            throw new Error("Unable to get access token.");
        }

        let authResponse = await response.json();
        return {
            access_token: authResponse.access_token,
            refresh_token: authResponse.refresh_token,
            expires_in: authResponse.expires_in
        };
    }

    throw new Error("No access token founds");
}


export function checkLoggedIn(): boolean {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("access_token");

    if (accessToken && accessToken.value && accessToken.value !== "" && accessToken.value !== null) {
        return true;
    }

    const refresh_token = cookieStore.get("refresh_token");
    if (refresh_token && refresh_token.value && refresh_token.value !== "" && refresh_token.value !== null) {
        return true;
    }

    return false;
}