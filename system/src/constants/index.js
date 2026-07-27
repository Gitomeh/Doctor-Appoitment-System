// Form validation constants
export const VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
  },
  REASON: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
};

// Email regex pattern
export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Time regex pattern (HH:MM format)
export const TIME_PATTERN = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Appointment status constants
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Status color mapping for UI
export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

// Error messages
export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: 'Name must be at least 2 characters',
  NAME_MAX_LENGTH: 'Name must not exceed 50 characters',
  CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  DOCTOR_REQUIRED: 'Please select a doctor',
  DATE_REQUIRED: 'Appointment date is required',
  DATE_FUTURE: 'Appointment date must be in the future',
  TIME_REQUIRED: 'Appointment time is required',
  REASON_REQUIRED: 'Please provide a reason for your visit',
  REASON_MIN_LENGTH: 'Reason must be at least 10 characters',
  REASON_MAX_LENGTH: 'Reason cannot exceed 500 characters',
};
