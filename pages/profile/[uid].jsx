import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserIcon from '../../images/user.png'
import { NotificationManager } from 'react-notifications';
import { AuthContext } from "@/context/authcontext";
import defaultAvatar from '../../images/user.png'


const Profile = () => {
    const router = useRouter() 
    const { uid } = router.query
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const authUser = useContext(AuthContext)
    const [isOwnProfile, setIsOwnProfile] = useState(false)

    const handleImageUploadToServer = async (event) => {
        if (isOwnProfile) {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('uid', user._id)
            const response = await axios.post(`/api/profile/updateuseravatar`, formData)
            if(response && response.status === 200){
                return router.reload()
            }
        }
    }
    useEffect(() => {
        async function getUserData() {
            setLoading(true)

            const response1 = await axios.post('/api/profile/getuserdata', { uid: uid }).catch(e => console.log(e.response.data.message))
            if (response1 && response1.data) {
                setUser(response1.data)
                setIsOwnProfile(authUser.userId === response1.data._id)
                console.log(authUser)
                console.log(response1.data)
            }

            setLoading(false)
        }
        getUserData()
    }, [uid, authUser])

    return (
        <div className="flex flex-col">
            {loading && <i className="fa-solid fa-spinner animate-spin text-4xl my-auto"></i>}
            {!loading &&
                <div className="bg-white text-violet-600 font-extrabold items-center md:text-3xl text-center p-2 md:p-5 h-max my-auto md:min-w-[30ch] md:max-w-max md:max-w-[30ch] xl:max-w-[60ch] flex flex-col gap-y-3">
                    <div className="flex flex-col items-center w-full gap-y-2">
                        <img src={user.avatar || defaultAvatar.src} className={`border w-24 h-24 rounded-full shadow-lg ${isOwnProfile && 'cursor-pointer'}`} onClick={() => { if (isOwnProfile) document.getElementById('userimage').click() }}></img>
                        <input type="file" accept="image/png, image/jpeg" className="hidden" id="userimage" onChange={handleImageUploadToServer} />
                        <span className="font-extrabold text-transparent text-2xl lg:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto py-2">{user.username}</span>
                    </div>
                    <hr className="w-full"></hr>
                    <span className="">{user.email}</span>
                </div>}
        </div>
    );
}

export default Profile;
