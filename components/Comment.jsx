import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Comment = (props) => {
    const {comment} = props
    const {date, text, user} = comment

    return (
        <div>
            <div className="max-w-[53ch] mx-auto bg-white rounded-md p-3 flex flex-col text-black gap-y-3">
                <div className="flex justify-between">
                    <Link href={'/profile/'+user._id} className={'hover:text-blue-500 duration-300 border-b border-slate-400 text-lg '}>{user.username}</Link>
                    <span>{new Date(date).toLocaleTimeString()} {new Date(date).toLocaleDateString()}</span>
                </div>
                <hr className='w-full'/>
                <span className="text-left">
                    {text}
                </span>
            </div>
        </div>
    );
}

export default Comment;
