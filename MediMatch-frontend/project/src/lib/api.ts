import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import type { Medication } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock API functions (replace with real API calls)
export const mockApi = {
  // Auth
    login: async (email: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: '1', email, name: email.split('@')[0] },
          token: 'mock-jwt-token-' + Date.now(),
        });
      }, 1000);
    });
  },

  // Medications
  getMedications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: [] }), 500);
    });
  },

    addMedication: async (medication: Medication) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: medication }), 500);
    });
  },

  // Placeholder for additional features
};
