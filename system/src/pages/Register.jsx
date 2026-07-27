import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/ui/FormInput';
import AlertMessage from '../components/ui/AlertMessage';

function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setMessage({ type: '', text: '' });
      
      // Remove confirmPassword from API call
      const { confirmPassword, ...registerData } = data;
      
      await registerUser(registerData);
      
      // Show success message
      setMessage({
        type: 'success',
        text: 'Registration successful! Redirecting to login...'
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Show error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Registration failed. Please try again.';
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h1>

        <AlertMessage type={message.type} message={message.text} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormInput
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            ariaInvalid={errors.name ? 'true' : 'false'}
            ariaDescribedby={errors.name ? 'name-error' : undefined}
            register={register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
              maxLength: {
                value: 50,
                message: 'Name must not exceed 50 characters',
              },
            })}
            error={errors.name?.message}
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            ariaInvalid={errors.email ? 'true' : 'false'}
            ariaDescribedby={errors.email ? 'email-error' : undefined}
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            ariaInvalid={errors.password ? 'true' : 'false'}
            ariaDescribedby={errors.password ? 'password-error' : undefined}
            register={register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password?.message}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            ariaInvalid={errors.confirmPassword ? 'true' : 'false'}
            ariaDescribedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            register={register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
