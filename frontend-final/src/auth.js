import apiClient from './apiClient';
import { navigateTo } from './utils/navigation';

export async function handleLogin(email, password) {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        const token = response.data.token;
        
        // First verify we can decode the token
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.user) {
            throw new Error('Invalid token structure');
        }
        
        // If token is valid, store it
        localStorage.setItem('token', token);
        
        // Use the decoded payload instead of calling getUser()
        if (payload.user.role === 'teacher') {
            navigateTo('/teacher-dashboard');
        } else if (payload.user.role === 'admin') {
            navigateTo('/admin');
        } else {
            navigateTo('/dashboard');
        }

        // Dispatch a custom event to notify other parts of the app (like the navbar)
        window.dispatchEvent(new CustomEvent('auth-change'));
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        // Simple error handling for prototype
        const errorMessage = error.response?.data?.msg || 'Please check your email and password';
        alert(errorMessage);
        return false;
    }
}

export async function handleRegister(name, email, password, role) {
    try {
        const response = await apiClient.post('/auth/register', { name, email, password, role });
        localStorage.setItem('token', response.data.token);

        // After registration, check user role and redirect
        if (role === 'teacher') {
            navigateTo('/teacher-dashboard');
        } else {
            navigateTo('/dashboard');
        }

        // Dispatch the auth-change event
        window.dispatchEvent(new CustomEvent('auth-change'));
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
    }
}

export function handleLogout() {
    localStorage.removeItem('token');
    navigateTo('/login');
    // Dispatch the auth-change event
    window.dispatchEvent(new CustomEvent('auth-change'));
}

export function getUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // Decode the token payload (the middle part of the JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.user;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

