import React from 'react';
import {CircularProgress} from "@mui/material";

export default function LoadingOverlay() {
    return (
        <div className="absolute inset-0 bg-white opacity-50 justify-center items-center flex z-40">
            <CircularProgress/>
        </div>
    );
};