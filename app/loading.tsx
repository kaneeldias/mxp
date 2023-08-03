import {CircularProgress} from "../lib/mui";

export default function Loading() {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <CircularProgress/>
        </div>
    )
}
