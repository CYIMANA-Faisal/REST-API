const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signup = async (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                res.status(409).send("User with this email exist")
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        const userData = {
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        }
                        User.create(userData)
                            .then(() => {
                                res.status(200).send({message: 'User created'})
                            })
                            .catch((err) => {
                                res.status(409).send({error:err.message})
                            });
                    });
                });
            }
        })
        .catch((err) => {
            res.send({error: err.message})
        });
}

const signin = async (req, res) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    return res.status(401).send({message: "Email and password are incorrect"})
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email
                      }, process.env.KEY, { expiresIn: '1h' });
                    return res.status(200).json({
                        message: "signed in successfully",
                        token: token
                    })
                }
                return res.status(401).json({message: "Email and password are incorrect"})
            });
        })
        .catch( error => {
            res.status(401).send({message: "Email and password are incorrect"}) 
        });
}

module.exports = {
    signup,
    signin
}