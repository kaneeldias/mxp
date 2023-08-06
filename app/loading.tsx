import {CircularProgress} from "@/_lib/mui";

export default function Loading() {
    return (
        <div className="flex w-full h-screen justify-center items-start m-10">
            <CircularProgress/>
        </div>
    )
}
