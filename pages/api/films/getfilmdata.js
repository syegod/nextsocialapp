import main from "@/db/main"
import { Film } from "@/db/models"

export default async function getfilmdata(req, res) {
    try {
        main()
        const { fid } = req.body
        if (!fid)
            return res.status(400).json({ message: 'Film ID is not provided!' })
        const candidate = await Film.findOne({ _id: fid }).populate({ path: 'comments', populate: { path: 'user' }, options:{sort: {date: -1}}})
        if (candidate)
            return res.status(200).json(candidate)
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }
}