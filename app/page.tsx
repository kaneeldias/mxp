import Image from 'next/image'
import AButton from "@/app/_components/AButton";
import {FaceIcon, LoginIcon, PeopleIcon} from "@/_lib/icons-material";
import Link from "next/link";
import {checkLoggedIn} from "@/_utils/auth_utils";
import {Member} from "@/app/_types/MemberTypes";
import {getCurrentPerson} from "@/app/_components/ProfileBox";

export default async function Home() {

    // const finalWelcomeMessage = "for our innovations to succeed, we need to ensure that our platforms support it lol"
    // const [welcomeMessage, setWelcomeMessage] = useState('');

    // let i: number = 0;
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         i++;
    //         setWelcomeMessage((prev) => prev + finalWelcomeMessage[i - 1]);
    //         if (i >= finalWelcomeMessage.length) {
    //             clearInterval(intervalId)
    //         }
    //     }, 75)
    //
    //     return () => clearInterval(intervalId);
    // }, []);

    let profile: Member = {} as Member
    if (checkLoggedIn()) {
        profile = await getCurrentPerson();
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center space-y-20 bg-aiesec-blue p-20">

            {/*<div className="text-white italic font-lato font-light text-xl">*/}
            {/*    {welcomeMessage}*/}
            {/*</div>*/}

            <Image
                src="/aiesec_member_logo_long_white.png"
                width={500}
                height={500}
                alt="AIESEC Member Logo"
            />

            <div className="space-x-10 justify-center items-center flex flex-col">

                {checkLoggedIn() ? (
                    <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
                        <Link href="/members">
                            <AButton variant="white">
                                <div className="space-x-2 items-center justify-center">
                                    <PeopleIcon/>
                                    <span>Members</span>
                                </div>
                            </AButton>
                        </Link>

                        <Link href={`/members/${profile.id}`}>
                            <AButton variant="white">
                                <div className="space-x-2 items-center justify-center">
                                    <FaceIcon/>
                                    <span>My Profile</span>
                                </div>
                            </AButton>
                        </Link>
                    </div>
                ) : (
                    <Link href="/auth/login">
                        <AButton variant="white">
                            <div className="space-x-2 items-center justify-center">
                                <LoginIcon/>
                                <span>Login</span>
                            </div>
                        </AButton>
                    </Link>
                )}

            </div>
        </div>
    )
}
