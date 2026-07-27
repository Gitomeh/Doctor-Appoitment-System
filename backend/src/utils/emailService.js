const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

const sendAppointmentConfirmation = async (patientEmail, patientName, doctorName, appointmentDate, appointmentTime) => {
  const subject = 'Appointment Confirmation';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Appointment Confirmed</h2>
      <p>Dear ${patientName},</p>
      <p>Your appointment has been successfully confirmed with the following details:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doctor:</strong> ${doctorName}</p>
        <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
      </div>
      <p>Please arrive 10 minutes before your scheduled appointment time.</p>
      <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
      <p>Best regards,<br>Doctor Appointment System</p>
    </div>
  `;

  const text = `
    Appointment Confirmed
    
    Dear ${patientName},
    
    Your appointment has been successfully confirmed with the following details:
    
    Doctor: ${doctorName}
    Date: ${new Date(appointmentDate).toLocaleDateString()}
    Time: ${appointmentTime}
    
    Please arrive 10 minutes before your scheduled appointment time.
    
    If you need to reschedule or cancel, please contact us as soon as possible.
    
    Best regards,
    Doctor Appointment System
  `;

  return sendEmail({
    to: patientEmail,
    subject,
    text,
    html
  });
};

const sendAppointmentCancellation = async (patientEmail, patientName, doctorName, appointmentDate, appointmentTime) => {
  const subject = 'Appointment Cancelled';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d32f2f;">Appointment Cancelled</h2>
      <p>Dear ${patientName},</p>
      <p>Your appointment has been cancelled with the following details:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doctor:</strong> ${doctorName}</p>
        <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
      </div>
      <p>If you did not request this cancellation, please contact us immediately.</p>
      <p>To schedule a new appointment, please visit our website.</p>
      <p>Best regards,<br>Doctor Appointment System</p>
    </div>
  `;

  const text = `
    Appointment Cancelled
    
    Dear ${patientName},
    
    Your appointment has been cancelled with the following details:
    
    Doctor: ${doctorName}
    Date: ${new Date(appointmentDate).toLocaleDateString()}
    Time: ${appointmentTime}
    
    If you did not request this cancellation, please contact us immediately.
    
    To schedule a new appointment, please visit our website.
    
    Best regards,
    Doctor Appointment System
  `;

  return sendEmail({
    to: patientEmail,
    subject,
    text,
    html
  });
};

const sendDoctorAppointmentCancellation = async (doctorEmail, doctorName, patientName, patientContactEmail, patientPhone, appointmentDate, appointmentTime, reason) => {
  const subject = 'Appointment Cancelled by Patient';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d32f2f;">Appointment Cancelled</h2>
      <p>Dear Dr. ${doctorName},</p>
      <p>An appointment has been cancelled by the patient with the following details:</p>
      <div style="background-color: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Patient Name:</strong> ${patientName}</p>
        <p><strong>Patient Email:</strong> ${patientContactEmail}</p>
        <p><strong>Patient Phone:</strong> ${patientPhone}</p>
        <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      </div>
      <p>This time slot is now available for other patients.</p>
      <p>Best regards,<br>Doctor Appointment System</p>
    </div>
  `;

  const text = `
    Appointment Cancelled by Patient
    
    Dear Dr. ${doctorName},
    
    An appointment has been cancelled by the patient with the following details:
    
    Patient Name: ${patientName}
    Patient Email: ${patientContactEmail}
    Patient Phone: ${patientPhone}
    Date: ${new Date(appointmentDate).toLocaleDateString()}
    Time: ${appointmentTime}
    Reason: ${reason}
    
    This time slot is now available for other patients.
    
    Best regards,
    Doctor Appointment System
  `;

  return sendEmail({
    to: doctorEmail,
    subject,
    text,
    html
  });
};

const sendAppointmentReminder = async (patientEmail, patientName, doctorName, appointmentDate, appointmentTime) => {
  const subject = 'Appointment Reminder';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1976d2;">Appointment Reminder</h2>
      <p>Dear ${patientName},</p>
      <p>This is a friendly reminder about your upcoming appointment:</p>
      <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doctor:</strong> ${doctorName}</p>
        <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
      </div>
      <p>Please remember to:</p>
      <ul>
        <li>Arrive 10 minutes before your scheduled time</li>
        <li>Bring your ID and insurance information</li>
        <li>Have your medical history ready</li>
      </ul>
      <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
      <p>Best regards,<br>Doctor Appointment System</p>
    </div>
  `;

  const text = `
    Appointment Reminder
    
    Dear ${patientName},
    
    This is a friendly reminder about your upcoming appointment:
    
    Doctor: ${doctorName}
    Date: ${new Date(appointmentDate).toLocaleDateString()}
    Time: ${appointmentTime}
    
    Please remember to:
    - Arrive 10 minutes before your scheduled time
    - Bring your ID and insurance information
    - Have your medical history ready
    
    If you need to reschedule, please contact us at least 24 hours in advance.
    
    Best regards,
    Doctor Appointment System
  `;

  return sendEmail({
    to: patientEmail,
    subject,
    text,
    html
  });
};

const sendDoctorAppointmentConfirmation = async (doctorEmail, doctorName, patientName, patientContactEmail, patientPhone, appointmentDate, appointmentTime, reason) => {
  const subject = 'New Appointment Scheduled';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2e7d32;">New Appointment Scheduled</h2>
      <p>Dear Dr. ${doctorName},</p>
      <p>A new appointment has been scheduled with the following details:</p>
      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Patient Name:</strong> ${patientName}</p>
        <p><strong>Patient Email:</strong> ${patientContactEmail}</p>
        <p><strong>Patient Phone:</strong> ${patientPhone}</p>
        <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      </div>
      <p>Please review the appointment details and prepare accordingly.</p>
      <p>If you need to make any changes, please contact the administration.</p>
      <p>Best regards,<br>Doctor Appointment System</p>
    </div>
  `;

  const text = `
    New Appointment Scheduled
    
    Dear Dr. ${doctorName},
    
    A new appointment has been scheduled with the following details:
    
    Patient Name: ${patientName}
    Patient Email: ${patientContactEmail}
    Patient Phone: ${patientPhone}
    Date: ${new Date(appointmentDate).toLocaleDateString()}
    Time: ${appointmentTime}
    Reason: ${reason}
    
    Please review the appointment details and prepare accordingly.
    
    If you need to make any changes, please contact the administration.
    
    Best regards,
    Doctor Appointment System
  `;

  return sendEmail({
    to: doctorEmail,
    subject,
    text,
    html
  });
};

module.exports = {
  sendEmail,
  sendAppointmentConfirmation,
  sendAppointmentCancellation,
  sendDoctorAppointmentCancellation,
  sendAppointmentReminder,
  sendDoctorAppointmentConfirmation
};
