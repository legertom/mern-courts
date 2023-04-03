const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user.model');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }),
);

router.use(passport.initialize());

// User registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required and must be a string.' });
  }
  const newUser = new User({ username, password: await User.prototype.encryptPassword(password) });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
