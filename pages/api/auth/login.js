import main from "@/db/main"
import { User } from "@/db/models"
import * as bcrypt from 'bcryptjs'
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"


export default async function login(req, res) {
    try {
        
        const {UserJWT} = req.cookies
        if(UserJWT)
            return res.status(300).json({ message: 'Already logged in!' })
        const { username, password } = req.body
        main()
        const candidate = await User.findOne({ username })

        if (!candidate) {
            return res.status(401).json({ message: 'Invalid credentials!' })
        }
        const passCompare = await bcrypt.compare(password, candidate.password)
        if (!passCompare) {
            return res.status(401).json({ message: 'Invalid password!' })
        }

        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 4,
                _id: candidate._id,
                username: candidate.username,
                type: candidate.type
            },
            process.env.NEXT_JWT_SECRET
        )
        const serialized = serialize("UserJWT", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 4,
            path: "/",
        })
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json({ message: "Logged in!" })

    } catch (error) {
        return res.status(500).json({ message: error.message || 'Something goes wrong!' })
    }
}