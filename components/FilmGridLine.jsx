import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const FilmGridLine = (props) => {
    const { item, isOwnProfile, authContext } = props
    const [isRemoved, setIsRemoved] = useState(false)

    async function handleDeleteFilm(){
        const response = await axios.post('/api/profile/deletefilmfromlist', {uid: authContext.userId, fid: item.film._id})
        if(response && response.status === 200){
            setIsRemoved(true)
            return NotificationManager.success(response.data.message)
        }
    }
    return (
        <div className={`flex items-center ${isRemoved && 'hidden'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full flex justify-between md:px-2">
                <Link className="max-w-[20ch] hover:text-blue-600 duration-200 cursor-pointer" href={'/films/' + item.film._id}>{item.film.title}</Link>
                <span className='hidden sm:block'><span>{item.rating === 0 ? '-' : item.rating}</span>/10</span>
                <span className='hidden sm:block'>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            {isOwnProfile && <div className='fa-solid fa-xmark cursor-pointer' onClick={() => handleDeleteFilm()}></div>}
        </div>
    );
}

export default FilmGridLine;