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
app.use('/uploads', express.static(path.join(__dirname)))
app.use(express.urlencoded({ extended: false }));
app.use(session({secret:'secret' }))