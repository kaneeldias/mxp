"use client"

import {createContext, Dispatch, SetStateAction, useState} from "react";
import {Breadcrumb, getHomeBreadcrumbs} from "@/app/_components/BreadcrumbsBar";

export type AppData = {
    breadcrumbs: {
        value: Breadcrumb[],
        set: Dispatch<SetStateAction<Breadcrumb[]>>
    };
}

export const AppContext = createContext<AppData | null>(null);

export function AppProvider({children}: { children: React.ReactNode }) {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(getHomeBreadcrumbs());

    const initialAppContext: AppData = {
        breadcrumbs: {
            value: breadcrumbs,
            set: setBreadcrumbs
        }
    }


    return (
        <AppContext.Provider value={initialAppContext}>
            {children}
        </AppContext.Provider>
    )
}

