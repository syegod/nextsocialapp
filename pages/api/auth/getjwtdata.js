import main from "@/db/main"
import { User } from "@/db/models"
import { verify } from "jsonwebtoken"
import * as bcrypt from 'bcryptjs'

export default async function getjwtdata(req, res) {
    try {
        const { UserJWT } = req.cookies
        if (!UserJWT)
            return res.status(401).json({message: 'Cookie is empty!'})
            const data = verify(UserJWT, process.env.NEXT_PUBLIC_JWT_SECRET)
        return res.status(200).json({token:UserJWT, userdata: data})
    } catch (e) { 
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }

}