import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import User from '../models/user.model.js'
import dotenv from 'dotenv'

dotenv.config();


const opts = {}
opts.secretOrKey = process.env.JWT_SECRET
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();


// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch user details in each request.
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
        // or you could create a new account
      }
    })
  })
)