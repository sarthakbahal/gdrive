const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register',
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Invalid email address'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid input data'
      })
    }

    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword

    })

    res.json(newUser);

  });

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login',
  body('username').trim().isLength({ min: 3 }).withMessage('Invalid email address'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid input data'
      });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username
    })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid username or password'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({
        message: 'Invalid username or password'
      });
    }

    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      username: user.username
    },
      process.env.JWT_SECRET,
  
    )

    res.json({
      token
    })

  }
)

module.exports = router;
