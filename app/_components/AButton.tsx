"use client"

import React from 'react';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
}

export default function AButton(
    {
        text = defaultProps.text,
        onClick = defaultProps.onClick
    }: ButtonProps
) {
    return (
        <div
            className="p-2 px-4 bg-aiesec-blue rounded-md font-bold text-sm inline-block text-white hover:bg-blue-600 transition duration-300 hover:cursor-pointer"
            onClick={onClick}
        >
            {text}
        </div>
    );
};

const defaultProps: ButtonProps = {
    text: "SUBMIT",
    onClick: () => {
    }
}