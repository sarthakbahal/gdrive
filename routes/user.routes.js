const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register' , (req, res) => {
  console.log('User registration data:', req.body);
  res.send('User registered successfully');
});

module.exports = router;
