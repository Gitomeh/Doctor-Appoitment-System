const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ available: true });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'doctorId, appointmentDate, and appointmentTime are required'
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    if (!doctor.available) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is currently not available for appointments'
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime: appointmentTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'Doctor is not available at the requested date and time',
        available: false
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor is available at the requested date and time',
      available: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking doctor availability',
      error: error.message
    });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  checkAvailability
};
