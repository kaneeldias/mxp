"use client"

import Image from 'next/image'
import {useEffect, useState} from "react"

export default function Home() {

    const finalWelcomeMessage = "for our innovations to succeed, we need to ensure that our platforms support it lol"
    const [welcomeMessage, setWelcomeMessage] = useState('');

    let i: number = 0;
    useEffect(() => {
        const intervalId = setInterval(() => {
            i++;
            setWelcomeMessage((prev) => prev + finalWelcomeMessage[i - 1]);
            if (i >= finalWelcomeMessage.length) {
                clearInterval(intervalId)
            }
        }, 75)

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center space-y-10 bg-aiesec-blue">

            <div className="text-white italic font-lato font-light text-xl">
                {welcomeMessage}
            </div>

            <Image
                src="/aiesec_member_logo_long_white.png"
                width={500}
                height={500}
                alt="AIESEC Member Logo"
            />
        </div>
    )
}
