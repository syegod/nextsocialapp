import { useContext, useState } from "react";
import Login from "./Login";
import axios from "axios";
import Modal from "./Modal";
import Link from "next/link";
import { AuthContext } from "@/context/authcontext";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import { useRouter } from "next/router";
import DropdownMenu from "./DropdownMenu";
import { useTransition, animated } from "react-spring";


const Header = () => {
    const router = useRouter()
    const [loginModal, setLoginModal] = useState(false)
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const authcontext = useContext(AuthContext)
    

    const handleLogout = async () => {
        const logoutresponse = await axios.get('/api/auth/logout')
        if (logoutresponse && logoutresponse.status === 200) {
            NotificationManager.success(logoutresponse.data.message);
            return router.reload()
        }
        else {
            NotificationManager.error(logoutresponse.response.data.message)
        }
    }
    return (
        <>
            <div className="px-2 sm:px-14 md:px-24 h-16 bg-white text-violet-600 flex items-center justify-between select-none w-full z-50">
                <Link className="text-2xl sm:text-4xl font-extrabold drop-shadow-lg outline-none" href={'/'}>
                    NEXTFILMS
                </Link>
                <Link className="hidden md:block outline-none font-bold text-xl sm:text-3xl" href={'/films/'}>
                    FILMS
                </Link>
                {!authcontext.isAuthenticated &&
                    <div className="hidden md:flex gap-x-5 items-center">
                        <button onClick={() => setLoginModal(true)} className="text-xl">SIGN IN</button>
                    </div>
                }
                
                {authcontext.isAuthenticated &&
                    <div className="hidden md:flex text-2xl items-center gap-x-5 md:gap-x-[5ch]">
                        <Link href={`/profile/${authcontext.userId}`}><i className="fa-solid fa-user cursor-pointer hover:scale-110 duration-100"></i></Link>
                        <i className="fa-solid fa-right-from-bracket cursor-pointer hover:scale-110 duration-100" onClick={() => handleLogout()}></i>
                    </div>
                }
                <div className="block md:hidden">
                    <i className="fa-solid fa-bars cursor-pointer text-3xl" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}></i>
                </div>
            </div>
            {loginModal && <Modal setModal={setLoginModal}><Login></Login></Modal>}
            <div className="z-40"><DropdownMenu isOpen={dropdownIsOpen} setDropdownIsOpen={setDropdownIsOpen} setLoginModal={setLoginModal} handleLogout={handleLogout}/></div>
        </>
    );
}

export default Header;
