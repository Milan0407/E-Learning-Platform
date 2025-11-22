import { handleLogin } from '../auth.js';

export const LoginPage = () => {
  return `
    <div class="min-h-screen flex items-center justify-center px-6 py-12 lg:px-8 relative">
      <!-- Background Elements -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style="animation-delay: 2s;"></div>
      </div>

      <div class="w-full max-w-md">
        <div class="card-modern animate-fadeInUp">
          <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p class="mt-2 text-gray-600">Sign in to continue your learning journey</p>
          </div>

          <form id="login-form" class="space-y-6">
            <div class="space-y-4">
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
                  <input id="password" name="password" type="password" autocomplete="current-password" required 
                         class="input-modern w-full" 
                         placeholder="Enter your password">
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" class="btn-primary w-full text-lg py-4 rounded-xl hover-lift shadow-glow">
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Sign In
                </span>
              </button>
            </div>
          </form>

          <div class="mt-8 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <a href="/register" data-link class="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-300">
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const initLoginPage = () => {
    const form = document.querySelector('#login-form');
    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button.innerHTML;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        button.disabled = true;
        button.innerHTML = '<span class="flex items-center justify-center gap-2">Signing in...</span>';
        
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        
        const success = await handleLogin(email, password);
        
        if (!success) {
            button.disabled = false;
            button.innerHTML = originalButtonText;
        }
    });
};

