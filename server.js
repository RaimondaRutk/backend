import express from 'express'
import cors from 'cors'
import mongoose from'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/users.js'

const app = express();
const port = process.env.PORT || 5000;
// create express server
app.use(cors());
app.use(express.json());
dotenv.config();
//parse json

const uri = process.env.DB_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
//starts the server