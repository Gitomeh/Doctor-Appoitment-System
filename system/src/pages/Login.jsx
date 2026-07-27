import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/ui/FormInput';
import AlertMessage from '../components/ui/AlertMessage';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Check if user is already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      navigate('/');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      setMessage({ type: '', text: '' });
      
      await login(data);
      
      // Show success message
      setMessage({
        type: 'success',
        text: 'Login successful! Redirecting...'
      });
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Show error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Login failed. Please check your credentials.';
      
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
          Login
        </h1>

        <AlertMessage type={message.type} message={message.text} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
            autoComplete="current-password"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
