const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const user = require('../models/user');


router.get('/', (req, res) => {
    res.json({ msg: 'users api' })
})

router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let regDate = {
        username,
        password
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(regDate.password, salt, function (err, hash) {
            if (err) throw err;
            regDate.password = hash;
            new user(regDate).save().then(user => res.json(user))
                .catch(err => { console.log(err); })
        });
    });

})

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user.findOne({ username }).then(user => {
        bcrypt.compare(password, user.password).then(sure => {
            if (sure) {
                jwt.sign({ username: user.username }, 'secret', { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        username: user.username,
                        token: "Bearer "+token
                    });
                })
            }

        }).catch(err => { console.log(err); })
    }).catch(err => { console.log(err); })
})

router.post('/getinfo', passport.authenticate('jwt', { session: false }),(req, res) => {
    res.json(req.user)
})


module.exports = router