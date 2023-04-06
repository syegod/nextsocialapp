import { serialize } from "cookie"

export default async function logout(req, res) {
    try {
        const { cookies } = req
        const jwt = cookies.UserJWT
        if (!jwt) {
            return res.status(401).json({ message: 'You are not logged in.' })
        }
        else {
            const serialized = serialize("UserJWT", null, {
                httpOnly: false,
                secure: false,
                sameSite: "strict",
                maxAge: -1,
                path: "/",
            })
            res.setHeader('Set-Cookie', serialized)
            return res.status(200).json({ message: "Success!" })
        }
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }

}