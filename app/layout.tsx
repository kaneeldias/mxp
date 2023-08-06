import Head from "next/head"
import './globals.css'
import React from "react";
import {AppProvider} from "@/app/_context/AppContext";

export const metadata = {
    title: 'AIESEC Member'
}

export default function RootLayout({children,}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <Head>
            <link rel="icon" href="/favicon.ico"/>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <body className="flex flex-col h-screen">

        <AppProvider>
            {children}
        </AppProvider>

        </body>
        </html>
    )
}
