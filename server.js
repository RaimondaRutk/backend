import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/users.js'
import passport from 'passport'

const app = express();
const port = process.env.PORT || 5000;
// create express server
dotenv.config();

import "./strategies/JwtStrategy.js"
import "./strategies/LocalStrategy.js"
import "./authenticate.js"

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },

  credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());


//parse json

const uri = process.env.DB_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(passport.initialize())

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
//starts the server