import { handleRegister } from '../auth.js';

export const RegisterPage = () => {
  return `
    <div class="min-h-screen flex items-center justify-center px-6 py-12 lg:px-8 relative">
      <!-- Background Elements -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style="animation-delay: 2s;"></div>
      </div>

      <div class="w-full max-w-md">
        <div class="card-modern animate-fadeInUp">
          <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Join Shiksha Jyoti</h2>
            <p class="mt-2 text-gray-600">Start your educational journey today</p>
          </div>

          <form id="register-form" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div class="relative">
                  <input id="name" name="name" type="text" required 
                         class="input-modern w-full" 
                         placeholder="Enter your full name">
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                <div class="relative">
                  <input id="email" name="email" type="email" autocomplete="email" required 
                         class="input-modern w-full" 
                         placeholder="Enter your email">
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div class="relative">
                  <input id="password" name="password" type="password" autocomplete="new-password" required 
                         class="input-modern w-full" 
                         placeholder="Create a password">
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label for="role" class="block text-sm font-semibold text-gray-700 mb-2">I am a</label>
                <div class="relative">
                  <select id="role" name="role" required 
                          class="input-modern w-full appearance-none">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" class="btn-primary w-full text-lg py-4 rounded-xl hover-lift shadow-glow">
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                  Create Account
                </span>
              </button>
            </div>
          </form>

          <div class="mt-8 text-center">
            <p class="text-gray-600">
              Already have an account?
              <a href="/login" data-link class="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-300">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const initRegisterPage = () => {
    const form = document.querySelector('#register-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const role = formData.get('role');
        await handleRegister(name, email, password, role);
    });
};

