import mongoose from 'mongoose'
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose"

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlenght: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  }
}, {
    timestamps:true,
})

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken
    return ret
  },
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema);

export default User;













