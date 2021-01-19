import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true },
    backpack: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }]
})

const User = mongoose.model('User', UserSchema)

export default User