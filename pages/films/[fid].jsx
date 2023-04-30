import { AuthContext } from "@/context/authcontext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Comment from "@/components/Comment";

const Film = () => {
    const router = useRouter()
    const [filmdata, setFilmData] = useState({})
    const [loading, setLoading] = useState(false)
    const { fid } = router.query
    const [newComment, setNewComment] = useState({ text: null, userid: null, filmid: null })
    const authContext = useContext(AuthContext)
    
    useEffect(() => {
        async function getFilm() {
            const response = await axios.post('/api/films/getfilmdata', { fid }).catch(e => console.log(e.message))
            if (response && response.status === 200) {
                setFilmData(response.data)
                console.log(response.data)
            }
        }
        setLoading(true)
        getFilm()
        setLoading(false)
        
    }, [])

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

                <div className="flex flex-col md:flex-row gap-x-10 gap-y-5 items-center text-center md:text-left font-serif">
                    <div className="bg-black w-52 h-72">
                    </div>
                    <div className="flex flex-col text-2xl gap-y-7">
                        <span className="font-medium">{filmdata.title}</span>
                        <span><span className="border-b">Country</span>: {(filmdata && filmdata.country) && filmdata?.country?.slice(0, 1)[0].toLocaleUpperCase() + filmdata?.country?.slice(1, filmdata?.country?.length)}</span>
                        <div>
                            <span className="border-b">Genres</span>: {filmdata.genres?.map((elem, index) => {
                                if (index == filmdata.genres.length - 1) {
                                    return <span>{elem.slice(0, 1)[0].toLocaleUpperCase() + elem.slice(1, elem.length)}</span>
                                } else {
                                    return <span>{elem.slice(0, 1)[0].toLocaleUpperCase() + elem.slice(1, elem.length)}, </span>
                                }
                            }
                            )}
                        </div>
                        <div className="">
                            <span className="border-b">Rating</span>: 9/10
                        </div>
                        <div className="">
                            <span className="border-b">Release date</span>: {new Date(filmdata.releaseDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
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
