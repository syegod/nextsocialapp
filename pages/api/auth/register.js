import main from "@/db/main"
import { User } from "@/db/models"
import * as bcrypt from 'bcryptjs'

export default async function register(req, res) {
    try {
        main()
        const { username, email, password } = req.body
        const candidateuname = await User.findOne({ username })
        if (candidateuname)
            return res.status(400).json({ message: 'Username already exists.' })
        const candidateemail = await User.findOne({ email })
        if (candidateemail)
            return res.status(400).json({ message: 'User with same email already exists.' })
        const hashedPassword = await bcrypt.hash(password, 6)
        const user = new User({ username, email, password: hashedPassword })

        await user.save()
        return res.status(201).json({ message: 'User succesfully created!' })
    } catch (e) {
        res.status(500).json({ message: e.message || 'Something gone wrong!' })
    }

}