import main from "@/db/main"
import { Film, User } from "@/db/models"

export default async function deletefilmfromlist(req, res) {
    try {
        main()
        const { fid, uid } = req.body
        const film = await Film.findOneAndUpdate({ _id: fid }, {$pull: {inLists: {_id: uid}}})
        const user = await User.findOneAndUpdate({ _id: uid }, {$pull: {watchedFilms: {film: fid}}})
        await user.save()
        await film.save()
        return res.status(200).json({ message: 'Film removed from your list!', userNewFilmList: user.watchedFilms })
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something gone wrong!' })
    }

}