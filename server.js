const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require('express-session');
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');

const User = require('./models/Users');


const products = require('./routes/api/products')
const reviews = require('./routes/api/reviews')
const users = require('./routes/api/users')


const app = express();

/*app.use(session({
    secret: "Darth-Vader",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(user => {
		done(null, user);
	});
});*/

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(bodyParser.json());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))



//DB Config
const db = require('./config/keys').mongoURI

//Connect to mongod
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use routes
app.use('/api/products', products)
app.use('/api/reviews', reviews)
app.use('/api/users', users)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
