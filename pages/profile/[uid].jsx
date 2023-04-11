import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import UserIcon from '../../images/user.png'

const Profile = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const { uid } = router.query
    useEffect(() => {
        async function getUserData() {
            setLoading(true)
            const response = await axios.post('/api/profile/getuserdata', { uid: uid }).catch(e => console.log(e.response.data.message))
            if (response && response.data) {
                setUser(response.data)

            }
            setLoading(false)
        }
        getUserData()
    }, [uid])
    console.log(user)
    return (
        <div className="flex flex-col">
            {loading && <i class="fa-solid fa-spinner animate-spin text-4xl my-auto"></i>}
            {!loading  &&
                <div className="bg-white text-violet-600 font-extrabold items-center md:text-3xl text-gradient-to-r from-blue-500 to-purple-500 text-center p-2 md:p-5 h-max my-auto md:max-w-max md:max-w-[30ch] xl:max-w-[60ch] flex flex-col gap-y-3">
                    <div className="flex flex-col xl:flex-row items-center w-full gap-y-2">
                        <Image src={UserIcon.src} width={64} height={64} className="border rounded-full shadow-lg cursor-pointer justify-self-start"></Image>
                        <span className="font-extrabold text-transparent text-2xl lg:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto">{user.username}</span>
                    </div>
                    <hr className="w-full"></hr>
                    <span className="">{user.email}</span>
                </div>}
        </div>
    );
}

export default Profile;
