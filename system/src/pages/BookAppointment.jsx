import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import doctorService from '../services/doctorService';
import FormInput from '../components/ui/FormInput';
import AlertMessage from '../components/ui/AlertMessage';
import PageLayout from '../components/layouts/PageLayout';

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm();

  const selectedDoctorId = watch('doctor');
  const selectedDoctor = doctors.find(doc => doc._id === selectedDoctorId);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    fetchDoctors();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (doctorId && doctors.length > 0) {
      setValue('doctor', doctorId);
    }
  }, [doctorId, doctors, setValue]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load doctors. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setMessage({ type: '', text: '' });
      
      // Combine date and time
      const appointmentDateTime = new Date(`${data.date}T${data.time}`);
      
      const appointmentData = {
        doctor: data.doctor,
        appointmentDate: appointmentDateTime.toISOString(),
        appointmentTime: data.time,
        reason: data.reason,
      };

      console.log('Appointment data:', appointmentData);
      // TODO: Implement API call to book appointment
      // const response = await appointmentService.bookAppointment(appointmentData);
      
      setMessage({
        type: 'success',
        text: 'Appointment booked successfully! Redirecting to your account...'
      });
      
      setTimeout(() => {
        navigate('/my-account');
      }, 2000);
      
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to book appointment. Please try again.';
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    }
  };

  // Get minimum date (tomorrow to ensure only future appointments)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <PageLayout title="Book Appointment">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          <AlertMessage type={message.type} message={message.text} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Doctor Selection */}
              <div>
                <label htmlFor="doctor" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Select Doctor
                </label>
                <select
                  id="doctor"
                  aria-invalid={errors.doctor ? 'true' : 'false'}
                  aria-describedby={errors.doctor ? 'doctor-error' : undefined}
                  {...register('doctor', {
                    required: 'Please select a doctor',
                  })}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base ${
                    errors.doctor ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name} - {doctor.specialty} ({doctor.hospital})
                    </option>
                  ))}
                </select>
                {errors.doctor && (
                  <p id="doctor-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.doctor.message}
                  </p>
                )}
                
                {/* Selected Doctor Details */}
                {selectedDoctor && (
                  <div className="mt-3 p-3 sm:p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-indigo-900 text-sm sm:text-base">{selectedDoctor.name}</p>
                        <p className="text-xs sm:text-sm text-indigo-700 mt-1">
                          <span className="font-medium">Specialty:</span> {selectedDoctor.specialty}
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-700">
                          <span className="font-medium">Hospital:</span> {selectedDoctor.hospital}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Appointment Date
                </label>
                <input
                  id="date"
                  type="date"
                  min={minDate}
                  aria-invalid={errors.date ? 'true' : 'false'}
                  aria-describedby={errors.date ? 'date-error' : 'date-hint'}
                  {...register('date', {
                    required: 'Appointment date is required',
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      if (selectedDate <= today) {
                        return 'Appointment date must be in the future';
                      }
                      return true;
                    },
                  })}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p id="date-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.date.message}
                  </p>
                )}
                <p id="date-hint" className="text-xs sm:text-sm text-gray-500 mt-1">
                  Only future appointments are allowed (starting from tomorrow)
                </p>
              </div>

              {/* Time Selection */}
              <FormInput
                id="time"
                label="Appointment Time"
                type="time"
                ariaInvalid={errors.time ? 'true' : 'false'}
                ariaDescribedby={errors.time ? 'time-error' : undefined}
                register={register('time', {
                  required: 'Appointment time is required',
                })}
                error={errors.time?.message}
              />

              {/* Reason for Visit */}
              <div>
                <label htmlFor="reason" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Reason for Visit
                </label>
                <textarea
                  id="reason"
                  rows="4"
                  aria-invalid={errors.reason ? 'true' : 'false'}
                  aria-describedby={errors.reason ? 'reason-error' : undefined}
                  {...register('reason', {
                    required: 'Please provide a reason for your visit',
                    minLength: {
                      value: 10,
                      message: 'Reason must be at least 10 characters',
                    },
                    maxLength: {
                      value: 500,
                      message: 'Reason cannot exceed 500 characters',
                    },
                  })}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base ${
                    errors.reason ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your symptoms or reason for visit"
                />
                {errors.reason && (
                  <p id="reason-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
        </div>
      </div>
    </PageLayout>
  );
}

export default BookAppointment;
