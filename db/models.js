import { Schema, model, Types } from "mongoose"

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
})

const User = model('User') || model('User', UserSchema)
export {User}


