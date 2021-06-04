const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const possportJwt = require('passport-jwt');

const newsRouter = require('./api/news.js');
const userRouter = require('./api/user.js');
const app = new express();


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use('/api/news', newsRouter);
app.use('/api/user', userRouter);

mongoose.connect('mongodb+srv://test:test@cluster0.d1q1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(() => { console.log('connect success') })
    .catch(err => console.log(err));

app.use(passport.initialize());


const user = mongoose.model('users');
const JwtStrategy = possportJwt.Strategy,
    ExtractJwt = possportJwt.ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    user.findOne({ username: jwt_payload.username }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.listen(process.env.PORT || 80);
