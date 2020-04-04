require('dotenv').config
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { checkPassword } = require('../helpers/bcrypt')

class UserController {

    static signup(req, res){
        const { email, username, password } = req.body
        User.create({
            email: email,
            username: username,
            password: password
        })
            .then(user => { 
                const token = jwt.sign({
                    userId : user.id,
                    username : user.username
                }, process.env.JWT_SECRET)
                if (user) {
                    res.status(201).json({ token }) // DATA CREATED
                } else {
                    res.status(400).json({ // BAD REQUEST, CLIENT ERROT
                        messege: 'Invalid Input, Please try again' 
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

    static signin(req, res){
        const { username, password } = req.body
        User.findOne({
            where: {
                username: username 
            }
        })
            .then(user => {
                const messege = {
                    messege: 'Username / Password Incorrect'
                }
                if (!user) {
                    res.status(400).json(messege) // BAD REQUEST 
                } else {
                    const isValid = checkPassword(password, user.password)
                    if (!isValid) {
                        res.status(400).json(messege) // BAD REQUEST 
                    } else {
                        const token = jwt.sign({
                            UserId: user.id,
                            username: user.username
                        }, process.env.JWT_SECRET)
                        res.status(200).json({ token })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ // SERVER ERROR
                    messege: 'Server failed to response'
                }) 
            })
    }

    static googleSignIn(req, res){
        const token = req.body.token
        const user = {}
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(data => {
                const payload = data.getPayload()
                // console.log(payload);
                user.username = payload.name
                user.email = payload.email
                user.password = 'qwerty' // INI DEFAULT
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then(userData => {
                if (userData) {
                    return userData
                } else {
                    return User.create(user)
                }
            })
            .then(userLogin => {
                let userObj = {
                    id: userLogin.id,
                    username: userLogin.username,
                    email: userLogin.email
                }
                res.status(200).json({
                    token: jwt.sign(userObj, process.env.JWT_SECRET)
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

}

module.exports = UserController