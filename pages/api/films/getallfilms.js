import main from "@/db/main"
import { Film } from "@/db/models"

export default async function getallfilms(req, res) {
    try {
        main()
        let films = await Film.find({})
        return res.status(200).json(films)
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }

}