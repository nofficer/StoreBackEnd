const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require("passport");
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

router.use(cookieParser());


const User = require('../../models/Users');



router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
})

router.get('/register' , (req, res) => {
  res.send('This is the register route!')
})

router.post('/register', (req, res) => {
  console.log(req.body)
  const {username, password } = req.body;
  const newUser = new User({username, password})
    User.register(newUser, req.body.password, function(err, user){
      console.log("from the register post request")
        if (err) {
            console.log(err)
        }
        /*passport.authenticate("local")(req, res, function(){
            console.log('user added')
        })*/
    });
})

/*// POST route to register a user
app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});
*/
/*
router.post('/login', passport.authenticate('local'),   function(req, res) {
    req.session.user = req.user;
    req.session.save()
    console.log("From the login post request")
    res.send(req.session.user)
  } );*/

router.post('/login', function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect username or password'
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
            console.log("user authenticated")
        }
      });
    }
  });
});

router.get("/logout", function(req, res){
    req.logout();
    console.log('User logged out')
})

router.get('/status', withAuth, function(req, res) {
  res.send(true);
});

/*router.get('/status', function(req, res) {
  console.log(req.isAuthenticated())
  res.send(req.isAuthenticated())
  console.log(req.session.user)
})*/

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


module.exports = router;
