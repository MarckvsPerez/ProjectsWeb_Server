import { Schema, model } from 'mongoose'
import { type IUser } from '../types/IUser'

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: { type: String, required: true },
  active: Boolean,
  avatar: String
})

const User = model<IUser>('User', UserSchema)

export default User
