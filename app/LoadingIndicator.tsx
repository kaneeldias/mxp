import {CircularProgress} from "@/_lib/mui";

export default function LoadingIndicator() {
    return (
        <div className="flex w-full h-screen justify-center items-start m-10">
            <CircularProgress/>
        </div>
    )
}
