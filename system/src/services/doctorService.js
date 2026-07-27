import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const doctorService = {
  // Get all doctors
  getAllDoctors: async () => {
    try {
      const response = await axiosInstance.get('/doctors');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get doctor by ID
  getDoctorById: async (id) => {
    try {
      const response = await axiosInstance.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get doctors by specialty
  getDoctorsBySpecialty: async (specialty) => {
    try {
      const response = await axiosInstance.get(`/doctors?specialty=${specialty}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default doctorService;