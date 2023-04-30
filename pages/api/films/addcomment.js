import main from "@/db/main"
import { Types } from "mongoose"
import { Comment, Film, User } from "@/db/models"
import axios from "axios"

export default async function addcomment(req, res) {
    try {
        main()
        const { newComment } = req.body
        const uid = new Types.ObjectId(newComment.userid)
        const fid = new Types.ObjectId(newComment.filmid)
        const curfilm = await Film.findOne({_id: fid})
        const user = await User.findOne({_id: uid})
        const commentDoc = new Comment({text: newComment.text, user: uid, film: fid, date: new Date()})
        curfilm.comments.push(commentDoc)
        user.comments.push(commentDoc)
        await user.save()
        await curfilm.save()
        await commentDoc.save()
        return res.status(201).json({message: 'Comment succesfully added!'})
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }
    
}