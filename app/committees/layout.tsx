import AuthComponent from "@/app/_components/AuthComponent";
import React from "react";
import HeaderBar from "@/app/_components/HeaderBar";
import LeftNav from "@/app/_components/LeftNav";

export default function MembersLayout({children,}: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex-none min-h-screen fixed hidden md:block">
                <LeftNav/>
            </div>

            <div className="flex flex-col h-screen md:ml-[74px]">
                <HeaderBar/>

                <div className="w-full">
                    <AuthComponent/>
                    {children}
                </div>
            </div>
        </>
    );
}
