import axios from "axios";
import { useState } from "react";
import { Router, useRouter } from "next/router"
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Login = () => {
    const router = useRouter()
    const [isSignIn, setIsSignIn] = useState(true)
    const [form, setForm] = useState({
        email: '', username: '', password: ''
    })
    const [error, setError] = useState(null)

    const submitHandler = async () => {
        console.log(form)
        if (!form.username || form.username.length < 4) {
            setTimeout(() => setError(null), 3000)
            return setError('Username length should be more than 4')
        }
        if (!form.password || form.password.length < 4) {
            setTimeout(() => setError(null), 3000)
            return setError('Password length should be more than 4')
        }
        let response
        if (isSignIn) {
            response = await axios.post('/api/auth/login', form).then(f => {NotificationManager.success(f.data.message); return router.reload()}, e => NotificationManager.error(e.response.data.message))
        }
        else {
            response = await axios.post('/api/auth/register', form).then(f => {NotificationManager.success(f.data.message); return router.reload()}, e => NotificationManager.error(e.response.data.message))
        }
    }

    const inputHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="flex flex-col items-center gap-y-5">
            <div className="flex gap-x-5 select-none">
                <button className={`${isSignIn && `underline`}`} onClick={() => setIsSignIn(true)}>Sign in</button>
                |
                <button className={`${!isSignIn && `underline`}`} onClick={() => setIsSignIn(false)}>Sign up</button>
            </div>
            {error &&
                <div className="text-red-500 text-sm">
                    {error}
                </div>}
            <div className="flex flex-col gap-y-5 font-normal">
                <div className="flex flex-col gap-y-1">
                    <span>Username:</span>
                    <input type="text" name="username" onChange={e => inputHandler(e)} className="border-2 px-2 outline-none" />
                </div>
                {!isSignIn &&
                    <div className="flex flex-col gap-y-1">
                        <span>Email:</span>
                        <input type="email" name="email" onChange={e => inputHandler(e)} className="border-2 px-2 outline-none" />
                    </div>
                }
                <div className="flex flex-col gap-y-1">
                    <span>Password:</span>
                    <input type="password" name="password" onChange={e => inputHandler(e)} className="border-2 px-2 outline-none" />
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-violet-500 text-white drop-shadow-lg" onClick={() => submitHandler()}>{isSignIn ? 'Login' : 'Register'}</button>
            </div>
            <NotificationContainer />
        </div>
    );
}

export default Login;
