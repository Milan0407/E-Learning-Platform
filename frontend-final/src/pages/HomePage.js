export const HomePage = () => {
  return `
    <div class="relative min-h-screen overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div class="absolute top-0 right-1/4 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute -bottom-8 left-1/3 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 4s;"></div>
      </div>

      <!-- Hero Section -->
      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div class="text-center animate-fadeInUp">
            <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
              Welcome to 
              <span class="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Shiksha Jyoti
              </span>
            </h1>
            <p class="mt-8 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Bringing the light of quality digital education to rural India. Empowering students and teachers with the skills for a modern world through innovative learning experiences.
            </p>
            <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/courses" data-link class="btn-primary text-lg px-8 py-4 rounded-xl hover-lift shadow-glow">
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-5.747-5.747h11.494"></path>
                  </svg>
                  Browse Courses
                </span>
              </a>
              <a href="/register" data-link class="text-lg font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-6 py-4 rounded-xl hover:bg-primary-50">
                Sign Up <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="relative py-24 px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Shiksha Jyoti?</h2>
            <p class="mt-4 text-lg text-gray-600">Empowering education through technology</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="card-modern text-center hover-lift animate-fadeInUp" style="animation-delay: 0.1s;">
              <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-5.747-5.747h11.494"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Quality Education</h3>
              <p class="text-gray-600">Access to high-quality educational content designed by expert teachers from the community.</p>
            </div>
            
            <div class="card-modern text-center hover-lift animate-fadeInUp" style="animation-delay: 0.2s;">
              <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Fast Learning</h3>
              <p class="text-gray-600">Interactive lessons and multimedia content that make learning engaging and effective.</p>
            </div>
            
            <div class="card-modern text-center hover-lift animate-fadeInUp" style="animation-delay: 0.3s;">
              <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p class="text-gray-600">Built by teachers, for teachers. A community-driven platform that grows with your needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const initHomePage = () => {
  // No specific JS needed for this simple page
};

