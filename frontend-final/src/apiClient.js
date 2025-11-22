import axios from 'axios';

// Create a new instance of axios with a custom configuration
const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const baseURL = rawBase.replace(/\/$/, ''); // remove trailing slash

const apiClient = axios.create({
    baseURL, // Fallback for local dev
    headers: {
        'Content-Type': 'application/json',
    },
});

// This interceptor adds the auth token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
