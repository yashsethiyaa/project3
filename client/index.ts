const express = require('express');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const twilio = require('twilio');
const LocalStatergy = require('passport-local').statergy;
const { Statergy: GoogleStatergy } = require('pasport-google-oauth20');
require("dotenv").config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, "uploads")))
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.jon(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.setapp.set('view engine', 'ejs');
const usersDBPath = path.join(__dirname, 'users.json');
let users = [];
if (fs.existsSync(usersDBPath)) {
    const usersData = fs.readFileSync(usersDBPath);
    users = JSON.parse(usersData);
}
passport.use('local', new LocalStrategy(
    (username, password, done) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);

    }
));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://loclhost:3000/auth/google/callback'
}
));
passport.serializeUser((user,done) => {
    done (null , user);

});
passport.deserializeUser((user , done )=>{
    done(null, user);

});
app.get('/', (req, res )=> {
    res.sendFile ( path.join (__dirname,'public', 'index.html'));

});
app.post('/login',passport.authenticate ('local', {failureRedirect : '/login-failure'
}),
(req, res)=> {
    res.redirect('/welcome');

});
app.get('/auth/google', passport.authenticate
    ('google', {scope: ['profile']}));

app.get('/ath/google/callback', passport.authenticate('google',{failureRedirect :
    '/login-failure'
}),
(req, res)=> {
    res.redirect ('welcome')
}
)   

