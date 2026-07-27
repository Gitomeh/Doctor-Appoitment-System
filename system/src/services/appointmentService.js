import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

const appointmentService = {
  getAppointments: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.patient) params.append('patient', filters.patient);
      if (filters.doctor) params.append('doctor', filters.doctor);
      if (filters.status) params.append('status', filters.status);

      const response = await axiosInstance.get(`/appointments?${params.toString()}`);
      return response.data.appointments;
    } catch (error) {
      throw error;
    }
  },

  getAppointmentById: async (id) => {
    try {
      const response = await axiosInstance.get(`/appointments/${id}`);
      return response.data.appointment;
    } catch (error) {
      throw error;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await axiosInstance.post('/appointments', appointmentData);
      return response.data.appointment;
    } catch (error) {
      throw error;
    }
  },

  updateAppointment: async (id, appointmentData) => {
    try {
      const response = await axiosInstance.put(`/appointments/${id}`, appointmentData);
      return response.data.appointment;
    } catch (error) {
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      const response = await axiosInstance.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelAppointment: async (id, userId) => {
    try {
      const response = await axiosInstance.post(`/appointments/${id}/cancel`, { userId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default appointmentService;
