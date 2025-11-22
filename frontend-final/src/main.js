import './style.css'; // Or your output.css, depending on setup
import { router } from './router';
import { navigateTo } from './utils/navigation';
import { updateNavbar } from './components/Navbar';
import { updateFooter } from './components/Footer';
import { handleLogout } from './auth';

// Theme management
const initTheme = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icons based on current theme
    const updateIcons = (theme) => {
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };
    
    updateIcons(savedTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });
};

// This function handles all clicks on the page and checks if a link was clicked
const handleNavigationClick = (e) => {
    // Check if the clicked element or its parent is a link with the data-link attribute
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        navigateTo(link.href);
    }

    // Check if the logout button was clicked
    if (e.target.closest('#logout-button')) {
        handleLogout();
    }
};

// Listen for browser's back/forward buttons
window.addEventListener('popstate', router);

// When the page first loads...
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing app...');
    
    // Initialize theme
    initTheme();
    console.log('Theme initialized');
    
    // Set up the global click listener to handle all navigation
    document.body.addEventListener('click', handleNavigationClick);
    console.log('Navigation click handler added');

    // Update the navbar to show correct login/logout state
    updateNavbar();
    console.log('Navbar updated');
    
    // Update the footer
    updateFooter();
    console.log('Footer updated');

    // Run the router to show the correct page based on the initial URL
    console.log('Running router...');
    router();
    console.log('Router completed');

    // Listen for our custom 'auth-change' event to update the navbar after login/logout
    window.addEventListener('auth-change', () => {
        updateNavbar();
    });
});

