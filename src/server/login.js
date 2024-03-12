const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// JWT strategy options
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret' // This should be in your environment variables
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
  // Find the user in your DB based on the payload's user ID
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
}));

// Initialize passport middleware
app.use(passport.initialize());
