import { Schema, model, Types } from "mongoose"

const UserSchema = new Schema({
    username: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    avatar: { type: String },
    watchedFilms: [{
        film: { type: Types.ObjectId, ref: 'Film' },
        rating: { type: Number },
        date: { type: Date },
        _id: {type: Number}
    }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }]
})
let User
try {
    User = model('User')
} catch (error) {
    User = model('User', UserSchema)
}
export { User }


const FilmSchema = new Schema({
    title: { type: String, unique: true, require: true },
    description: { type: String, require: true },
    rating: {
        ratingSum: {type:Number, default: 0},
        ratedBy: [{userid:{type: Types.ObjectId, ref: 'User'}}]
    },
    image: [{ type: String }],
    genres: [{ type: String }],
    country: { type: String },
    releaseDate: { type: Date },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    inLists: [{userid:{type: Types.ObjectId, ref: 'User'}}]
})
let Film
try {
    Film = model('Film')
} catch (error) {
    Film = model('Film', FilmSchema)
}
export { Film }


const CommentSchema = new Schema({
    text: { type: String, require: true },
    date: { type: Date, require: true },
    user: { type: Types.ObjectId, require: true, ref: 'User' },
    film: { type: Types.ObjectId, require: true, ref: 'Film' }
})

let Comment
try {
    Comment = model('Comment')
} catch (error) {
    Comment = model('Comment', CommentSchema)
}
export { Comment }


