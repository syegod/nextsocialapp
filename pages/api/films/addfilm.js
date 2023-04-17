import main from "@/db/main"
import { Film } from "@/db/models"
import axios from "axios"

export default async function addfilm(req, res) {
    try {
        main()
        const { form } = req.body
        const candidate = await Film.findOne({title: form.title})
        if(candidate)
            return res.status(300).json({message: 'Film with same title already exists!'})
        const film = new Film(form)
        await film.save()
        return res.status(201).json({message: 'Film succesfully added!'})
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }
    
}