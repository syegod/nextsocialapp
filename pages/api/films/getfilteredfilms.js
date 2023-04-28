import main from "@/db/main"
import { Film } from "@/db/models"

export default async function getfilteredfilms(req, res) {
    try {
        main()
        const { filter } = req.body
        let films = await Film.find({})
        if (filter) {
            if (filter.year) {
                films = films.filter(e => (new Date(e.releaseDate).getFullYear() > filter.year[0] && new Date(e.releaseDate).getFullYear() < filter.year[1]))
            }
            if (JSON.stringify(filter.genres) !== "[]") {
                films = films.filter((film) => {
                    return film.genres.some((genre) => filter.genres.includes(genre));
                });
            }
            if (filter.country) {
                films.forEach(e => console.log(e.country))
                films = films.filter(e => e.country == filter.country)
            }
        }


        return res.status(200).json(films)
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }

}