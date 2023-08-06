import BreadcrumbsBar from "@/app/_components/BreadcrumbsBar";
import ProfileBox from "@/app/_components/ProfileBox";

export default async function HeaderBar() {
    return (
        <div className="flex flex-row p-2 md:p-4 border-b-2 justify-between items-center">
            <BreadcrumbsBar/>
            <ProfileBox/>
        </div>
    )
}