import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import UserIcon from '../../images/user.png'
import { NotificationContainer, NotificationManager } from 'react-notifications';


const Profile = () => {
    const router = useRouter()
    const { uid } = router.query
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isOwnProfile, setIsOwnProfile] = useState(false)

    const handleImageUploadToServer = async (event) => {
        if (isOwnProfile) {
            const file = event.target.files[0]

            const formData = new FormData()
            formData.append('file', file)
            formData.append('public_id', user._id)
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
            formData.append('folder', `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/avatars`)

            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
            if (response && response.status === 200) {
                NotificationManager.success('Success!')
                const updateuseravatarres = await axios.post(`/api/profile/updateuseravatar`, { avatar: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDERS_PATH + '/avatars/' + user._id })
            } else if (response.status !== 200) {
                NotificationManager.error('Error. Please try again.')
            }
        }
    }
    useEffect(() => {
        async function getUserData() {
            setLoading(true)

            const response1 = await axios.post('/api/profile/getuserdata', { uid: uid }).catch(e => console.log(e.response.data.message))
            const response2 = await axios.post('/api/auth/getjwtdata').catch(e => console.log(e.response.data.message))
            if ((response1 && response1.data) && (response2 && response2.data)) {
                setUser(response1.data)
                setIsOwnProfile(response1.data._id === response2.data.userdata._id)
            }
            
            setLoading(false)
        }
        getUserData()
    }, [uid])

    return (
        <div className="flex flex-col">
            {loading && <i className="fa-solid fa-spinner animate-spin text-4xl my-auto"></i>}
            {!loading &&
                <div className="bg-white text-violet-600 font-extrabold items-center md:text-3xl text-gradient-to-r from-blue-500 to-purple-500 text-center p-2 md:p-5 h-max my-auto md:max-w-max md:max-w-[30ch] xl:max-w-[60ch] flex flex-col gap-y-3">
                    <div className="flex flex-col xl:flex-row items-center w-full gap-y-2">
                        {!loading && <img src={`${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDERS_PATH}/avatars/${user._id}`} width={72} height={72} className={`border rounded-full shadow-lg ${isOwnProfile && 'cursor-pointer'} justify-self-start`} onClick={() => { if (isOwnProfile) document.getElementById('userimage').click() }}></img>}
                        <input type="file" className="hidden" id="userimage" onChange={handleImageUploadToServer} />
                        <span className="font-extrabold text-transparent text-2xl lg:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto">{user.username}</span>
                    </div>
                    <hr className="w-full"></hr>
                    <span className="">{user.email}</span>
                </div>}
            <NotificationContainer></NotificationContainer>
        </div>
    );
}

export default Profile;
