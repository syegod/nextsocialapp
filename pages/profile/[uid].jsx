import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NotificationManager } from 'react-notifications';
import { AuthContext } from "@/context/authcontext";
import defaultAvatar from '../../images/user.png'
import FilmGridLine from "@/components/FilmGridLine";


const Profile = () => {
    const router = useRouter()
    const { uid } = router.query
    const [filmlist, setFilmList] = useState([])
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
            if (response && response.status === 200) {
                return NotificationManager.success("Image will be changed soon.")
            }
        }
    }
    useEffect(() => {
        async function getUserData() {
            setLoading(true)
            const response1 = await axios.post('/api/profile/getuserdata', { uid: uid }).catch(e => console.log(e.response.data.message))
            if (response1 && response1.status === 200) {
                setUser(response1.data)
                setFilmList(response1.data.watchedFilms)
                setIsOwnProfile(authUser.userId === response1.data._id)
            }
            setLoading(false)
        }
        getUserData()
        console.log(filmlist)
    }, [authUser])

    return (
        <div className="flex flex-col w-full items-center">
            {loading && <i className="fa-solid fa-spinner animate-spin text-4xl absolute top-1/2 z-50 left-1/2"></i>}
            {!loading &&
                <div className="bg-white text-violet-600 font-extrabold items-center md:text-3xl text-center p-2 md:p-5 h-max mt-10 w-full md:max-w-[50ch] flex flex-col gap-y-2 sm:gap-y-5">
                    <div className="flex flex-col items-center w-full gap-y-2">
                        <div className={`w-32 h-32 rounded-full ${isOwnProfile && 'cursor-pointer'} overflow-hidden`}><img src={user.avatar || defaultAvatar.src} className={`h-full w-full`} onClick={() => { if (isOwnProfile) document.getElementById('userimage').click() }}></img></div>
                        <input type="file" accept="image/png, image/jpeg" className="hidden" id="userimage" onChange={handleImageUploadToServer} />
                        <span className="font-extrabold text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto pb-1">{user.username}</span>
                    </div>
                    <hr className="w-full"></hr>
                    <span className="">{user.email}</span>
                    <span>User film list:</span>
                    {user?.watchedFilms?.length > 0 ? <div className="flex flex-col w-full text-lg font-normal text-black">
                        <div className="grid grid-cols-1 sm:grid-cols-3 w-full md:px-2">
                            <span className="max-w-[20ch]">Title:</span>
                            <span className='hidden sm:block'>Rated:</span>
                            <span className='hidden sm:block'>Added:</span>
                        </div>
                        <hr className="w-full" />
                        {user?.watchedFilms?.map(item => {
                            return <div>
                                <FilmGridLine item={item} isOwnProfile={isOwnProfile} authContext={authUser} setFilmList={setFilmList}/>
                                <hr className="w-full" />
                            </div>
                        })}
                    </div> : <div className="text-lg font-medium">User has no films in list.</div>}
                </div>}
        </div>
    );
}

export default Profile;
