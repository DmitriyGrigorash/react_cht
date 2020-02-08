const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('YOU')
    });
    app.post('/api/users/register', async (req, res) => {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    return res.status(400).json({
                        email: 'Email already exists'
                    });
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) console.error('Error: ', err);
                        else {
                            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                                if(err) console.error('Error: ', err);
                                else {
                                    newUser.password = hash;
                                    await newUser.save()
                                        .then(user => {
                                            res.json(user)
                                        });
                                }
                            });
                        }
                    })
                }
            })
    });

    app.post('/api/users/login', (req, res) => {

        const email = req.body.email;
        const password = req.body.password;

        User.findOne({email})
            .then(user => {
                if(!user) {
                    return res.status(404).json('User not found');
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                            };
                            jwt.sign(payload, keys.tKey, {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            return res.status(400).json('Incorrect Password');
                        }
                    });
            });
    });

    app.get('/api/users/me', passport.authenticate('jwt', { session: false }), (req, res) => {
        return res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    });
};
