import React from "react";

export default function MembersLayout({children,}: { children: React.ReactNode }) {
    return (
        <>
            <div className="m-5 md:m-10">
                {children}
            </div>
        </>
    );
}
