import passport from "passport"
import PassportLocal from "passport-local"
const LocalStrategy = PassportLocal.Strategy
import User from '../models/user.model.js'

//Called during login/sign up.
passport.use(new LocalStrategy(User.authenticate()))

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser())