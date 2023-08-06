"use client"

import React, {useContext, useEffect} from 'react';
import {Member} from "@/app/_types/MemberTypes";
import {AppContext} from "@/app/_context/AppContext";

export default async function ProfileData(props: { profile: Member }) {
    const context = useContext(AppContext);
    const profile = context!.profile;
    useEffect(() => {
        profile.set({
            id: props.profile.id,
            profile_photo: props.profile.profile_photo!,
        });
    }, []);

    return (<></>);
};
