'use client' // Error components must be Client Components

import {useEffect} from 'react'

export default function Error({error, reset,}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col text-3xl font-bold justify-center items-center m-10 text-gray-700">
            Unable to retrieve position :(
            <div className="text-base text-gray-500 font-normal">
                {error.message}
            </div>
        </div>
    )
}
