const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { sendAppointmentConfirmation, sendDoctorAppointmentConfirmation, sendAppointmentCancellation, sendDoctorAppointmentCancellation } = require('../utils/emailService');

const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, appointmentDate, appointmentTime, reason } = req.body;

    if (!patient || !doctor || !appointmentDate || !appointmentTime || !reason) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: patient, doctor, appointmentDate, appointmentTime, reason'
      });
    }

    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const patientExists = await User.findById(patient);
    if (!patientExists) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    if (!doctorExists.available) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is currently not available for appointments'
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctor,
      appointmentDate: new Date(appointmentDate),
      appointmentTime: appointmentTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'Doctor is not available at the requested date and time'
      });
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason
    });

    await appointment.populate('patient', 'name email phone');
    await appointment.populate('doctor', 'name hospital specialty email phone');

    try {
      await sendAppointmentConfirmation(
        appointment.patient.email,
        appointment.patient.name,
        appointment.doctor.name,
        appointment.appointmentDate,
        appointment.appointmentTime
      );

      await sendDoctorAppointmentConfirmation(
        appointment.doctor.email,
        appointment.doctor.name,
        appointment.patient.name,
        appointment.patient.email,
        appointment.patient.phone,
        appointment.appointmentDate,
        appointment.appointmentTime,
        appointment.reason
      );
    } catch (emailError) {
      console.error('Error sending confirmation emails:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { patient, doctor, status } = req.query;
    const filter = {};

    if (patient) filter.patient = patient;
    if (doctor) filter.doctor = doctor;
    if (status) filter.status = status;

    const appointments = await Appointment.find(filter)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name hospital specialty email phone')
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name hospital specialty email phone');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { status, appointmentDate, appointmentTime, reason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointmentDate || appointmentTime) {
      const doctorId = appointment.doctor;
      const newDate = appointmentDate ? new Date(appointmentDate) : appointment.appointmentDate;
      const newTime = appointmentTime || appointment.appointmentTime;

      const existingAppointment = await Appointment.findOne({
        doctor: doctorId,
        appointmentDate: newDate,
        appointmentTime: newTime,
        status: { $in: ['pending', 'confirmed'] },
        _id: { $ne: req.params.id }
      });

      if (existingAppointment) {
        return res.status(409).json({
          success: false,
          message: 'Doctor is not available at the requested date and time'
        });
      }
    }

    if (status) appointment.status = status;
    if (appointmentDate) appointment.appointmentDate = new Date(appointmentDate);
    if (appointmentTime) appointment.appointmentTime = appointmentTime;
    if (reason) appointment.reason = reason;

    await appointment.save();
    await appointment.populate('patient', 'name email phone');
    await appointment.populate('doctor', 'name hospital specialty email phone');

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name hospital specialty email phone');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.patient._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to cancel this appointment'
      });
    }

    if (appointment.appointmentDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel past appointments'
      });
    }

    if (appointment.status === 'cancelled' || appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an appointment that is already ${appointment.status}`
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    try {
      await sendAppointmentCancellation(
        appointment.patient.email,
        appointment.patient.name,
        appointment.doctor.name,
        appointment.appointmentDate,
        appointment.appointmentTime
      );

      await sendDoctorAppointmentCancellation(
        appointment.doctor.email,
        appointment.doctor.name,
        appointment.patient.name,
        appointment.patient.email,
        appointment.patient.phone,
        appointment.appointmentDate,
        appointment.appointmentTime,
        appointment.reason
      );
    } catch (emailError) {
      console.error('Error sending cancellation emails:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling appointment',
      error: error.message
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment',
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  deleteAppointment
};
