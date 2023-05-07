import React from 'react';
import noimage from '../images/noimage.jpg'
import Link from 'next/link';

const FilmCard = (props) => {
    const { film } = props
    const {_id, title, description, genres, releaseDate, rating } = film
    return (
        <div className='bg-white flex rounded-lg duration-300 w-[25ch] sm:w-[50ch]'>
            {/* <img src={noimage.src} width={'260px'} height={'380px'} className='border-r bg-black'></img> */}
            <div className='text-center flex flex-col text-black py-2 w-full'>
                <Link href={'/films/'+_id} className='overflow-clip font-semibold text-lg cursor-pointer hover:text-blue-500 duration-300'>{title}</Link>
                <hr className='w-full bg-slate-300' />
                <div className='overflow-hidden max-h-[10ch] p-2 flex justify-between w-full'>
                    <span>
                        {description}
                    </span>
                </div>
                <hr />
                <div className='flex flex-col sm:flex-row justify-between px-2 items-center font-medium pt-2'>
                    <div className=''>
                        {genres?.map((elem, index) => {
                            if (index == genres.length - 1) {
                                return <span>{elem.slice(0, 1)[0].toLocaleUpperCase() + elem.slice(1, elem.length)}</span>
                            } else {
                                return <span>{elem.slice(0, 1)[0].toLocaleUpperCase() + elem.slice(1, elem.length)}, </span>
                            }
                        }
                        )}
                    </div>
                    <div className=''>
                        {(rating.ratedBy.length > 0 && rating.ratingSum > 0) ? (Math.round(rating.ratingSum / rating.ratedBy.length)) : "-"}/10
                    </div>
                    <div className=''>
                        {new Date(releaseDate).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilmCard;
