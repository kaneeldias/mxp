import AuthComponent from "@/app/_components/AuthComponent";
import React from "react";

export default function MembersLayout({children,}: { children: React.ReactNode }) {
    return (
        <>
            <AuthComponent/>
            {children}
        </>
    );
}
