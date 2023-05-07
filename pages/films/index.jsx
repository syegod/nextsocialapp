import FilmCard from "@/components/FilmCard";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";

const Index = () => {
    const [filmList, setFilmList] = useState([])
    const [loading, setLoading] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    async function getAllFilms() {
        setLoading(true)
        const response = await axios.get('/api/films/getallfilms')
        if (response && response.status === 200) {
            setFilmList(response.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        getAllFilms()
    }, [])
    return (
        <div className="flex flex-col gap-y-5 my-10">
            <SideBar isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} setFilmList={setFilmList} setLoading={setLoading} filmList={filmList} getAllFilms={getAllFilms}></SideBar>
            {loading && <i className="fa-solid fa-spinner animate-spin text-4xl absolute top-1/3 left-1/2 "></i>}
            <div className="w-full bg-blue-600 rounded-lg text-center block sm:hidden bg-gradient-to-r from-blue-600 to-cyan-500 font-medium" onClick={() => setIsFilterOpen(true)}>FILTER</div>
            <div className="w-full flex flex-col gap-y-10 items-center">
            {!loading && filmList.length === 0 && <span>Nothing found!</span>}
            {!loading && filmList.map(e => 
                    <div className="">
                        <FilmCard key={e._id} film={e} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Index;