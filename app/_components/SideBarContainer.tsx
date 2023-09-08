"use client"

import {ApartmentIcon, FaceIcon, MenuRounded, PeopleIcon} from "@/_lib/icons-material";
import React, {useState} from "react";
import Link from "next/link";

export default function SideBarContainer() {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <div className="md:hidden" onClick={toggleOpen}>
                <MenuRounded fontSize="medium"
                             className="text-gray-600 hover:text-aiesec-blue cursor-pointer transition-all duration-300 ml-2 mr-5"/>
            </div>

            {open &&
                <div className="top-0 left-0 z-40 fixed">
                    <div className="backdrop-blur-sm w-screen h-screen">
                        <div
                            className="bg-aiesec-blue h-screen flex p-2 hadow-blue-gray-900/5 absolute top-0 left-0 flex-col w-[300px]">

                            <MenuRounded fontSize="medium"
                                         className="text-white hover:text-gray-300 cursor-pointer transition-all duration-300 mr-5 ml-2"
                                         onClick={toggleOpen}/>

                            <div className="text-white font-bold mt-10 flex flex-col space-y-2">

                                <Link href="/profile">
                                    <div
                                        className="flex flex-row hover:bg-blue-400 transition-all duration-300 p-2 py-3 rounded-md">
                                        <FaceIcon fontSize="medium"/>
                                        <span className="ml-5">My Profile</span>
                                    </div>
                                </Link>

                                <Link href="/members">
                                    <div
                                        className="flex flex-row hover:bg-blue-400 transition-all duration-300 p-2 py-3 rounded-md">
                                        <PeopleIcon fontSize="medium"/>
                                        <span className="ml-5">Members</span>
                                    </div>
                                </Link>

                                <Link href="/committees">
                                    <div
                                        className="flex flex-row hover:bg-blue-400 transition-all duration-300 p-2 py-3 rounded-md">
                                        <ApartmentIcon fontSize="medium"/>
                                        <span className="ml-5">Committees</span>
                                    </div>
                                </Link>

                            </div>


                        </div>
                    </div>
                </div>
            }
        </>
    )
}