import { Schema, model, Types } from "mongoose"

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String }
})
let User
try {
    User = model('User')
} catch (error) {
    User = model('User', UserSchema)
}

export { User }

const FilmSchema = new Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    rating: { type: Number },
    image: { type: [String] },
    genres: {type: [String] },
    country: { type: String },
    releaseDate: { type: Date }
})
let Film
try {
    Film = model('Film')
} catch (error) {
    Film = model('Film', FilmSchema)
}

export { Film }


