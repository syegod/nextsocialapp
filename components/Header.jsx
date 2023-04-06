import { useContext, useState } from "react";
import Login from "./Login";
import axios from "axios";
import Modal from "./Modal";
import { AuthContext } from "@/context/authcontext";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter()
    const [loginModal, setLoginModal] = useState(false)
    const authcontext = useContext(AuthContext)
    const handleLogout = async () => {
        await axios.get('/api/auth/logout').then(f => {NotificationManager.success(f.data.message); return router.reload()}, e => {return NotificationManager.error(e.message)})
    }
    return (
        <>
            <div className="sm:px-10 md:px-32 w-full h-10 bg-purple-500 text-white flex items-center justify-between select-none">

                <button className="text-3xl font-semibold drop-shadow-lg">
                    NextSocial
                </button>
                {!authcontext.isAuthenticated &&
                    <div className="flex gap-x-5 items-center">
                        <button onClick={() => setLoginModal(true)} className="text-xl">Sign in</button>
                    </div>
                }
                {authcontext.isAuthenticated && 
                    <div className="flex text-2xl gap-x-5 md:gap-x-[5ch]">
                        <i className="fa-solid fa-user cursor-pointer"></i>
                        <i className="fa-solid fa-right-from-bracket cursor-pointer" onClick={() => handleLogout()}></i>
                    </div>
                }
            </div>
            {loginModal && <Modal setModal={setLoginModal}><Login></Login></Modal>}
            <NotificationContainer></NotificationContainer>
        </>
    );
}

export default Header;
