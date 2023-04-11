import { NextResponse } from "next/server";

export default function middleware(req){
    const UserJWT = req.cookies.get('UserJWT')
    const url = req.url
    if(!UserJWT && url.includes('/profile')){
        return NextResponse.redirect('http://localhost:3000')
    }
}