import { useContext, useState } from "react";
import Login from "./Login";
import axios from "axios";
import Modal from "./Modal";
import Link from "next/link";
import { AuthContext } from "@/context/authcontext";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter()
    const [loginModal, setLoginModal] = useState(false)
    const authcontext = useContext(AuthContext)
    const handleLogout = async () => {
        await axios.get('/api/auth/logout').then(f => {NotificationManager.success(f.data.message); return router.reload()}, e => NotificationManager.error(e.response.data.message))
    }
    return (
        <>
            <div className="sm:px-10 md:px-16 xl:px-72 w-full h-16 bg-white text-violet-600 flex items-center justify-between select-none">

                <Link className="text-4xl font-semibold drop-shadow-lg" href={'/'}>
                    NextSocial
                </Link>
                {!authcontext.isAuthenticated &&
                    <div className="flex gap-x-5 items-center">
                        <button onClick={() => setLoginModal(true)} className="text-xl">Sign in</button>
                    </div>
                }
                {authcontext.isAuthenticated && 
                    <div className="flex text-2xl items-center gap-x-5 md:gap-x-[5ch]">
                        <Link href={`/profile/${authcontext.userId}`}><i className="fa-solid fa-user cursor-pointer hover:scale-110 duration-100"></i></Link>
                        <i className="fa-solid fa-right-from-bracket cursor-pointer hover:scale-110 duration-100" onClick={() => handleLogout()}></i>
                    </div>
                }
            </div>
            {loginModal && <Modal setModal={setLoginModal}><Login></Login></Modal>}
            <NotificationContainer></NotificationContainer>
        </>
    );
}

export default Header;
