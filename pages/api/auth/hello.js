import main from "@/db/main"

export default function hello(req, res) {
    try {
        main()
        return res.status(200).json({ message: 'Hello!' })
    } catch (error) {
        return res.status(400).json({ message: error.message || 'Error!' })
    }

}