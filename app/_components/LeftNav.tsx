import Image from "next/image";
import {ApartmentIcon, Logout, PeopleIcon} from "@/_lib/icons-material";
import React from "react";
import Link from "next/link";
import {Tooltip} from "@/_lib/tailwind-material";

const tooltipAnimation = {
    mount: {scale: 1, y: 0, x: 25},
    unmount: {scale: 0, y: 0, x: 0},
}

const tooltipStyles = "text-sm font-bold text-white bg-aiesec-blue rounded-md p-2";

export default async function LeftNav() {
    return (
        <div
            className="sticky top-0 bg-aiesec-blue p-3 pt-4 h-screen text-white justify-center items-center space-y-7">
            <Image
                src="/aiesec_member_logo_vertical_white.svg"
                width={50}
                height={50}
                alt="AIESEC Member Logo"
                priority
            />

            <div cla>
                <div>
                    <div className="justify-center items-center flex">
                        <Tooltip content="Members" placement="right" animate={tooltipAnimation}
                                 className={tooltipStyles}>
                            <Link href="/members">
                                <PeopleIcon fontSize="large"/>
                            </Link>
                        </Tooltip>
                    </div>

                    <div className="justify-center items-center flex">
                        <Tooltip content="Committees" placement="right" animate={tooltipAnimation}
                                 className={tooltipStyles}>
                            <Link href="/committees">
                                <ApartmentIcon fontSize="large"/>
                            </Link>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <div className="justify-center items-center flex">
                        <Tooltip content="Log out" placement="right" animate={tooltipAnimation}
                                 className={tooltipStyles}>
                            <Link href="/auth/logout">
                                <Logout fontSize="large"/>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>

        </div>
    )
}