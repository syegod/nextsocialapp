import main from "@/db/main"
import { User } from "@/db/models"
import cloudinary from 'cloudinary'
import multiparty from 'multiparty'

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
        const form = new multiparty.Form()
        const data = await new Promise((resolve, reject) => {
            form.parse(req, async function (err, fields, files) {
                if (err) reject({ err });
                resolve({ fields, files });
                const result = await cloudinary.v2.uploader.upload(files.file[0].path,
                    {
                        public_id: fields.uid[0],
                        folder: 'nextfilms/avatars',
                        overwrite: true,
                        resource_type: 'image',
                    })
                const user = await User.findOne({ _id: fields.uid })
                user.avatar = result.secure_url
                await user.save()
                
            });
        });

        return res.status(200).json({ message: "Done" })
    } catch (e) {
        return res.status(500).json({ message: e.message || 'Something gone wrong!' })
    }

}