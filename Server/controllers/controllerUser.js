const { User } = require('../models')
const jwt = require('jsonwebtoken')

class UserController {

    static createUser(req, res){
        const { email, username, password } = req.body
        User.create({
            email: email,
            username: username,
            password: password
        })
            .then(user => { 
                console.log(user);
                
                if (user) {
                    res.status(201).json({ user }) // DATA CREATED
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


}

module.exports = UserController