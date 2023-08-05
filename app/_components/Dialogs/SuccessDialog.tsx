"use client"

import React from 'react';
import {Dialog, DialogActions} from "@mui/material";
import {ThumbUp} from "@mui/icons-material";

interface SuccessDialogProps {
    title?: string;
    content: React.ReactNode
    open: boolean;
    handleClose: () => void;
}

export default function SuccessDialog(props: SuccessDialogProps) {
    const title = props.title ?? "SUCCESS";
    const content = props.content;

    return (
        <Dialog open={props.open} onClose={props.handleClose}>

            <div className="rounded-xl space-y-10">
                <div
                    className="flex flex-row space-x-5 items-center justify-center text-3xl font-bold text-center text-white bg-green-600 p-5">
                    <ThumbUp fontSize="large"/>
                    <div>{title}</div>
                </div>

                <div className="text-xl text-gray-700 m-10 pb-5">{content}</div>
            </div>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};
