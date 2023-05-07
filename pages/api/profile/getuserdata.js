import main from "@/db/main"
import { User } from "@/db/models"
import axios from "axios"

export default async function getuserdata(req, res) {
    try {
        main()
        const { uid } = req.body
        if (!uid)
            return res.status(401).json({message: 'UserID is not provided!'})
        const candidate = await User.findById(uid).populate('comments watchedFilms.film')
        if(candidate)
            return res.status(200).json(candidate)
    } catch (e) { 
        return res.status(500).json({ message: e.message || 'Something gone wrong!' })
    }
}