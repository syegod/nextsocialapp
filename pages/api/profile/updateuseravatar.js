import main from "@/db/main"
import { User } from "@/db/models"
import cloudinary from 'cloudinary'
import formidable from "formidable"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure: true
})

export const config = {
    api: {
        bodyParser: false,
    },
}


export default async function updateuseravatar(req, res) {
    try {
        main()
        const form = formidable({ keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
            const result = await cloudinary.v2.uploader.upload(files.file.filepath,
                {
                    public_id: fields.uid,
                    folder: 'nextfilms/avatars',
                    overwrite: true,
                    resource_type: 'image',
                })
            const user = await User.findOne({ _id: fields.uid })
            user.avatar = result.secure_url
            await user.save()
        });

        return res.status(200).json({ message: 'Done!' })
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something goes wrong!' })
    }

}