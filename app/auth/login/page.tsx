import {redirect} from "next/navigation";

export default function Login() {
    const url = new URL("https://auth.aiesec.org/oauth/authorize");
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI!);
    redirect(url.toString());
}
