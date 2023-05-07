import main from "@/db/main"
import { Film, User } from "@/db/models"
import { verify } from "jsonwebtoken"
import { Types } from "mongoose"

export default async function addfilm(req, res) {
    try {
        main()
        const { fid, uid, rating } = req.body
        const user = await User.findOne({ _id: uid })
        const film = await Film.findOne({ _id: fid })
        user.watchedFilms.push({
            film: film,
            rating: rating,
            date: new Date(),
        });
        film.inLists.push(new Types.ObjectId(uid))
        if(!film.rating.ratedBy.includes(user._id)) {
            film.rating.ratingSum += rating
            film.rating.ratedBy?.push(user)
        }
        await film.save()
        await user.save()
        return res.status(201).json({ message: 'Film succesfully added to your list!' })
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something gone wrong!' })
    }

}