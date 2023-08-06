"use client"

import {createContext, Dispatch, SetStateAction, useState} from "react";
import {Breadcrumb} from "@/app/_components/BreadcrumbsBar";

export type AppData = {
    breadcrumbs: {
        value: Breadcrumb[],
        set: Dispatch<SetStateAction<Breadcrumb[]>>
    };
    profile: {
        value?: {
            id: string
            profile_photo: string
        },
        set: Dispatch<SetStateAction<{ id: string, profile_photo: string } | undefined>>
    }
}

export const AppContext = createContext<AppData | null>(null);

export function AppProvider({children}: { children: React.ReactNode }) {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
    const [profile, setProfile] = useState<{ id: string, profile_photo: string } | undefined>(undefined);

    const initialAppContext: AppData = {
        breadcrumbs: {
            value: breadcrumbs,
            set: setBreadcrumbs
        },
        profile: {
            value: profile,
            set: setProfile
        }
    }

    return (
        <AppContext.Provider value={initialAppContext}>
            {children}
        </AppContext.Provider>
    )
}

