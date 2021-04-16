const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const {TOKEN} = process.env;

passport.use(
  new LocalStrategy(    
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {      
      const user = await User.findOne({ where: { email: email } });
      if (!user || !user.correctPassword(password)) return done(null, false);
      const { id, firstName, lastName, email: userEmail, photoURL, isAdmin } = user;
      return done(null, {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        isAdmin,
      });
    }
  )
);

passport.use(
  new BearerStrategy ((token, done) => {
    jwt.verify(token, TOKEN, function(err, user){
      if (err) return done(err);
      return done(null, user ? user : false)
    })
}))

module.exports = passport;
