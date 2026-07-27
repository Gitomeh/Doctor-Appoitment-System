const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

const router = express.Router();

// Public routes - no authentication required
router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.post('/:id/cancel', cancelAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
