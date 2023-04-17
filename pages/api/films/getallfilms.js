import main from "@/db/main"
import { Film } from "@/db/models"
import axios from "axios"

export default async function getallfilms(req, res) {
    try {
        main()
        
    } catch (e) { 
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }

}