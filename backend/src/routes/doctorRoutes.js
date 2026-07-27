const express = require('express');
const { getAllDoctors, getDoctorById, checkAvailability } = require('../controllers/doctorController');

const router = express.Router();

// Public routes - no authentication required
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/check-availability', checkAvailability);

module.exports = router;
