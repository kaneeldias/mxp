import React from 'react';
import Image from "next/image";
import Link from "next/link";

type MiniInfoCardProps = {
    title: string;
    value: React.ReactNode;
    image?: string;
    link?: string;
};

const titleStyleClass = "text-sm md:text-lg text-slate-500 font-bold"
const valueStyleClass = "flex flex-row items-center space-x-2 text-md md:text-xl"

export default function MiniInfoCard(props: MiniInfoCardProps) {
    return (
        <div className="md:space-y-1">
            <div className={titleStyleClass}>{props.title}</div>

            {props.link ? (
                <Link href={props.link}>
                    <div className={`${valueStyleClass}`}>
                        {props.image &&
                            <Image src={props.image} alt={props.title} width={20} height={20}
                                   className="rounded-full"/>}
                        <div>{props.value}</div>
                    </div>
                </Link>
            ) : (
                <div className={valueStyleClass}>
                    {props.image &&
                        <Image src={props.image} alt={props.title} width={20} height={20} className="rounded-full"/>}
                    <div>{props.value}</div>
                </div>
            )}

        </div>
    );
};
