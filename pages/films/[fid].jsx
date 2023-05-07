import { AuthContext } from "@/context/authcontext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Comment from "@/components/Comment";
import Rating from '@mui/material/Rating';
import { NotificationManager } from "react-notifications";

const Film = () => {
    const router = useRouter()
    const [filmdata, setFilmData] = useState({})
    const [loading, setLoading] = useState(false)
    const { fid } = router.query
    const [newComment, setNewComment] = useState({ text: null, userid: null, filmid: null })
    const authContext = useContext(AuthContext)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        async function getFilm() {
            const response = await axios.post('/api/films/getfilmdata', { fid }).catch(e => console.log(e.message))
            if (response && response.status === 200) {
                setFilmData(response.data)
                setRating(Math.round(response.data.rating.ratingSum / response.data.rating.ratedBy.length))
                console.log(rating)
            }
        }
        setLoading(true)
        getFilm()
        setLoading(false)
    }, [authContext])


    async function handleAddFilmToList() {
        const response = await axios.post('/api/profile/addfilmtolist', { fid, uid: authContext.userId, rating }).catch(e => console.log(e.message))
        if (response && response.status === 201) {
            document.querySelector('#addtolist').className = "hidden"
            return NotificationManager.success(response.data.message)
        } else {
            return NotificationManager.error(response?.data?.message || response?.message)
        }
    }

    async function handleCommentChange(e) {
        e.preventDefault()
        setNewComment({ text: e.target.value, userid: authContext.userId, filmid: fid })
    }

    async function handleCommentSubmit(e) {
        e.preventDefault()
        console.log(newComment)
        const response = await axios.post('/api/films/addcomment', { newComment }).catch(e => console.log(e.message))
        if (response && response.status === 201) {
            document.getElementById('newComment').value = ''
        }
    }

    return (
        <>
            {loading && <i className="fa-solid fa-spinner animate-spin text-4xl absolute top-1/3 left-1/2"></i>}
            {!loading && <div className="flex flex-col my-5 md:my-20 gap-y-10">
                <div className="flex flex-col md:flex-row gap-x-10 gap-y-5 items-center text-center md:text-left">
                    <div className="bg-black w-52 h-72">
                    </div>
                    <div className="flex flex-col text-2xl gap-y-7">
                        <span className="font-medium">{filmdata.title}</span>
                        <span><span className="">Country</span>: {(filmdata && filmdata.country) && filmdata?.country?.slice(0, 1)[0].toLocaleUpperCase() + filmdata?.country?.slice(1, filmdata?.country?.length)}</span>
                        <div>
                            <span className="">Genres</span>: {filmdata.genres?.map((elem, index) => {
                                if (index == filmdata.genres.length - 1) {
                                    return <span>{elem.slice(0, 1)[0].toLocaleUpperCase() + elem.slice(1, elem.length)}</span>
                                } else {
                                    return <span>{elem.slice(0, 1)[0].toLocaleUpperCase() + elem.slice(1, elem.length)}, </span>
                                }
                            }
                            )}
                        </div>
                        <div className="">
                            <span className="">Release date</span>: {new Date(filmdata.releaseDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                {authContext.isAuthenticated && !filmdata?.inLists?.some(e => e._id === authContext.userId) ?
                    <div className="flex flex-col gap-y-2">
                        <Rating name="half-rating" className="mx-auto" defaultValue={rating/2} precision={0.5} size="large" onChange={(e) => setRating(e.target.value * 2)} max={5} />
                        <div onClick={() => handleAddFilmToList()} id="addtolist" className="mx-auto border py-1 px-2 bg-white text-violet-600 text-lg font-medium shadow-md rounded-sm cursor-pointer hover:scale-105 duration-200 select-none">
                            Add film to my list
                        </div>
                    </div>
                    : <Rating name="half-rating" className="mx-auto" value={rating/2} precision={0.5} size="large" onChange={(e) => setRating(e.target.value * 2)} max={5} readOnly/>}
                <div className="border-y py-5 max-w-[50ch] text-xl">
                    {filmdata.description}
                </div>
                <div className="flex flex-col gap-y-7 text-center">
                    <span>Comments:</span>
                    <div className="flex flex-col gap-y-5">
                        {authContext.isAuthenticated ?
                            <form onSubmit={e => handleCommentSubmit(e)} className="flex mx-auto w-full justify-center">
                                <textarea id="newComment" onChange={e => handleCommentChange(e)} className="max-w-[50ch] w-full sm:w-[50ch] outline-none rounded-l-lg text-black p-2 resize-none" placeholder="Write your comment" maxLength={300} />
                                <button className="text-5xl bg-blue-500 rounded-r-lg" type="submit">+</button>
                            </form>
                            : <span>Log in to write your comment</span>}
                        {!loading && filmdata?.comments?.length > 0 ? filmdata?.comments?.map((com, i) => {
                            return <Comment key={i} comment={com}></Comment>
                        }) : 'Film has no comments.'}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Film;
