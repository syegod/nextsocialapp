import React from 'react';
import noimage from '../images/noimage.jpg'
import Link from 'next/link';

const FilmCard = (props) => {
    const { film } = props
    const {_id, title, description, genres, releaseDate } = film
    return (
        <div className='h-[16ch] bg-white flex rounded-lg duration-300 w-[30ch]  sm:w-[50ch]'>
            {/* <img src={noimage.src} width={'260px'} height={'380px'} className='border-r bg-black'></img> */}
            <div className='text-center flex flex-col text-black py-2 w-full'>
                <Link href={'/films/'+_id} className='overflow-clip font-semibold text-lg cursor-pointer hover:text-blue-500 duration-300'>{title}</Link>
                <hr className='w-full bg-slate-300' />
                <div className='overflow-hidden h-[8ch] p-2 flex justify-between w-full'>
                    <span>
                        {description}
                    </span>
                </div>
                <hr />
                <div className='flex justify-between px-2 items-center font-medium pt-2'>
                    <div className=''>
                        {genres?.map((elem, index) => {
                            if (index == genres.length - 1) {
                                return <span>{elem}</span>
                            } else {
                                return <span>{elem}, </span>
                            }
                        }
                        )}
                    </div>
                    <div className=''>
                        9/10
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