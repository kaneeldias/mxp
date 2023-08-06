import React from 'react';
import {redirect} from "next/navigation";
import {checkLoggedIn} from "@/_utils/auth_utils";

export default async function AuthComponent() {
    if (!checkLoggedIn()) {
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`);
    }
    return (<></>);
};