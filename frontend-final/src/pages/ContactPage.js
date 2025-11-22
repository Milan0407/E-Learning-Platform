export const ContactPage = () => {
  return `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-16 animate-fadeInUp">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Get in 
            <span class="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our courses? Need help with your learning journey? We're here to help you succeed.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="animate-fadeInUp" style="animation-delay: 0.1s;">
            <div class="card-modern h-full">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Email Us</h3>
                    <p class="text-gray-600">support@shikshajyoti.com</p>
                    <p class="text-gray-600">info@shikshajyoti.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Call Us</h3>
                    <p class="text-gray-600">+91 98765 43210</p>
                    <p class="text-gray-600">+91 87654 32109</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Visit Us</h3>
                    <p class="text-gray-600">123 Education Street</p>
                    <p class="text-gray-600">Learning District, Mumbai 400001</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p class="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p class="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="animate-fadeInUp" style="animation-delay: 0.2s;">
            <div class="card-modern">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form id="contact-form" class="space-y-6">
                <div>
                  <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    required 
                    class="input-modern w-full"
                    placeholder="Enter your full name"
                  >
                  <div id="fullName-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    class="input-modern w-full"
                    placeholder="Enter your email address"
                  >
                  <div id="email-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    class="input-modern w-full"
                    placeholder="What is this about?"
                  >
                  <div id="subject-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                    Message <span class="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    required 
                    class="input-modern w-full resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  <div id="message-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-500">
                    <span class="text-red-500">*</span> Required fields
                  </div>
                  <button 
                    type="submit" 
                    id="submit-btn"
                    class="btn-primary px-8 py-3 text-lg font-semibold"
                  >
                    <span id="submit-text">Send Message</span>
                    <div id="submit-spinner" class="hidden">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </form>

              <!-- Success/Error Messages -->
              <div id="form-message" class="mt-6 hidden">
                <div id="success-message" class="hidden p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-green-800 font-medium">Message sent successfully!</span>
                  </div>
                </div>
                <div id="error-message" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span class="text-red-800 font-medium">Failed to send message. Please try again later.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-20 animate-fadeInUp" style="animation-delay: 0.3s;">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p class="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div class="card-modern">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">How do I enroll in a course?</h3>
              <p class="text-gray-600">Simply browse our courses, click on the one you're interested in, and hit the "Enroll Now" button. You'll have immediate access to all course materials.</p>
            </div>
            
            <div class="card-modern">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Are the courses free?</h3>
              <p class="text-gray-600">Yes! All our courses are completely free. We believe in making quality education accessible to everyone, especially in rural areas.</p>
            </div>
            
            <div class="card-modern">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Can I access courses on mobile?</h3>
              <p class="text-gray-600">Absolutely! Our platform is fully responsive and works perfectly on mobile devices, tablets, and desktop computers.</p>
            </div>
            
            <div class="card-modern">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">How do I become a teacher?</h3>
              <p class="text-gray-600">Contact us through this form or email us directly. We'll review your qualifications and help you get started as a teacher on our platform.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

import apiClient from '../apiClient';

export const initContactPage = () => {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const formMessage = document.getElementById('form-message');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  // Form validation function
  const validateForm = () => {
    let isValid = true;
    const fields = ['fullName', 'email', 'subject', 'message'];

    fields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      if (!field) return; // safety
      const errorDiv = document.getElementById(fieldName + '-error');

      // Clear previous errors
      field.classList.remove('border-red-500');
      if (errorDiv) {
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
      }

      // Validate required fields
      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        const label = fieldName === 'fullName' ? 'Full Name' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        if (errorDiv) {
          errorDiv.textContent = `${label} is required`;
          errorDiv.classList.remove('hidden');
        }
        isValid = false;
        return; // skip further checks for this field
      }

      // Email validation
      if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          field.classList.add('border-red-500');
          if (errorDiv) {
            errorDiv.textContent = 'Please enter a valid email address';
            errorDiv.classList.remove('hidden');
          }
          isValid = false;
        }
      }
    });

    return isValid;
  };

  // Show/hide messages
  const showMessage = (isSuccess) => {
    formMessage.classList.remove('hidden');
    if (isSuccess) {
      successMessage.classList.remove('hidden');
      errorMessage.classList.add('hidden');
    } else {
      successMessage.classList.add('hidden');
      errorMessage.classList.remove('hidden');
    }
  };

  const hideMessage = () => {
    formMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
  };

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous messages
    hideMessage();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitSpinner.classList.remove('hidden');
    
    try {
      // Prepare form data
      const formData = new FormData(form);
      const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      // Send POST request via apiClient (uses VITE_API_BASE_URL)
      try {
        const response = await apiClient.post('/contact', data);
        if (response && response.data && response.data.success) {
          showMessage(true);
          form.reset();
          formMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If backend returns a non-success payload, show error
          console.error('Contact response:', response && response.data);
          throw new Error((response && response.data && response.data.message) || 'Server error');
        }
      } catch (err) {
        console.error('Contact form error (apiClient):', err);
        showMessage(false);
      }
      
    } catch (error) {
      console.error('Contact form error:', error);
      showMessage(false);
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    }
  });

  // Real-time validation
  const fieldsList = ['fullName', 'email', 'subject', 'message'];
  fieldsList.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (!field) return;
    field.addEventListener('blur', () => {
      const errorDiv = document.getElementById(fieldName + '-error');

      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        const label = fieldName === 'fullName' ? 'Full Name' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        if (errorDiv) {
          errorDiv.textContent = `${label} is required`;
          errorDiv.classList.remove('hidden');
        }
      } else {
        field.classList.remove('border-red-500');
        if (errorDiv) errorDiv.classList.add('hidden');
        
        // Email validation on blur
        if (fieldName === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            field.classList.add('border-red-500');
            if (errorDiv) {
              errorDiv.textContent = 'Please enter a valid email address';
              errorDiv.classList.remove('hidden');
            }
          }
        }
      }
    });
    
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.classList.remove('border-red-500');
        const err = document.getElementById(fieldName + '-error');
        if (err) err.classList.add('hidden');
      }
    });
  });
};