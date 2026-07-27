const express = require('express');
const { getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes - require authentication
router.get('/profile', auth, getProfile);

module.exports = router;
