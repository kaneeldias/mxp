import Image from "next/image";

export default async function LeftNav() {
    return (
        <div className="sticky top-0 bg-aiesec-blue p-3 pt-2 h-screen">
            <Image
                src="/aiesec_member_logo_vertical_white.svg"
                width={50}
                height={50}
                alt="AIESEC Member Logo"
                priority
            />
        </div>
    )
}