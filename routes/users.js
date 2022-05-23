import express, { request } from 'express'
import User from '../models/user.model.js'
import { hashIt, compareIt } from '../helpers.js'

const router = express.Router();

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    User.findOne({$or:[{username: username},{email: email}]}, async (err, user) => {
      if(err) res.status(500).json('Error: ' + err)
      else if(user){
        res.status(401).json('Duomenys jau naudojami!');
      }
      else if(!user){
        const hashedPassword = await hashIt(password)
        const newUser = new User({username, password: hashedPassword, email});
        await newUser.save();
        res.status(201).json('Registracija sėkminga!')
      }else{
        res.status(500).json('Something went wrong!')
      }
    })
  } catch (err) {
    res.status(500).json('Error: ' + err)
  }
  
});

router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

    User.findOne({$or:[{username: username},{email: username}]}, async (err, user) => {
      if(err) res.status(500).json('Error: ' + err)
      else if(!user){
        res.status(401).json('Neteisingi duomenys!');
      }
      else{
        const valid = await compareIt(password, user.password)
        if(valid){
          res.status(200).json('Prisijungta Sėkmingai!');
        }else{
          res.status(401).json('Neteisingi duomenys!');
        }
      } 
    })
});


export default router;