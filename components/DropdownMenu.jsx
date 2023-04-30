import { AuthContext } from '@/context/authcontext';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useTransition, animated } from "react-spring";

const DropdownMenu = (props) => {
    const { isOpen, setLoginModal, handleLogout, setDropdownIsOpen } = props
    const authcontext = useContext(AuthContext)
    const transition = useTransition(isOpen, {
        from: { y: -200 },
        enter: { y: 0 },
        leave: { y: -200 }
    })
    return (
        <div>
            {transition((style, item) =>
                item ? <animated.div className='absolute block md:hidden text-violet-600 bg-white w-full right-0 border-t top-16 flex flex-col items-center gap-y-3 text-3xl py-3 font-bold' style={style}>
                    <Link className="outline-none" href={'/films/'} onClick={() => setDropdownIsOpen(false)}>
                        FILMS
                    </Link>
                    <hr className='w-full' />
                    {!authcontext.isAuthenticated &&
                        <div className="flex gap-x-5 items-center">
                            <button onClick={() => {setLoginModal(true); setDropdownIsOpen(false)}} className="text-xl">SIGN IN</button>
                        </div>
                    }
                    {authcontext.isAuthenticated &&
                        <div className="flex flex-col md:gap-x-[5ch] gap-y-3 w-full items-center">
                            <Link href={`/profile/${authcontext.userId}`} onClick={() => setDropdownIsOpen(false)}>PROFILE</Link>
                            <hr className='w-full' />
                            <div className="cursor-pointer" onClick={() => handleLogout()}>LOG OUT</div>
                        </div>
                    }
                </animated.div> : '')}
        </div>
    );
}

export default DropdownMenu;
