"use client"

import React from 'react';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
    variant?: "blue" | "white";
    children?: React.ReactNode;
}

export default function AButton(
    {
        text = defaultProps.text,
        onClick = defaultProps.onClick,
        variant = defaultProps.variant,
        children = defaultProps.children
    }: ButtonProps
) {

    const colorStyles = {
        blue: "bg-aiesec-blue hover:bg-blue-700 text-white",
        white: "bg-white hover:bg-gray-200 text-gray-700"
    }

    return (
        <div
            className={`p-2 md:p-3 px-4 md:px-6 rounded-md font-bold text:sm md:text-lg inline-block transition duration-300 hover:cursor-pointer ${colorStyles[variant!]}`}
            onClick={onClick}
        >
            {children ? (<div className="mr-2 inline-block">{children}</div>) : (<>{text}</>)}
        </div>
    );
};

const defaultProps: ButtonProps = {
    text: "SUBMIT",
    onClick: () => {
    },
    variant: "blue",
    children: null
}