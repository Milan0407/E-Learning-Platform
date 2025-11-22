import apiClient from '../apiClient';
import { CourseCard } from '../components/CourseCard';

export const CoursesPage = () => {
    return `
    <div class="min-h-screen py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-16 animate-fadeInUp">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Explore Our 
            <span class="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a world of knowledge with our carefully curated collection of courses taught by expert teachers from the community.
          </p>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-12 animate-fadeInUp" style="animation-delay: 0.1s;">
          <div class="card-modern max-w-2xl mx-auto">
            <div class="flex items-center space-x-4">
              <div class="flex-1 relative">
                <input type="text" placeholder="Search courses..." 
                       class="input-modern w-full pl-10" 
                       id="course-search">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              <button class="btn-primary px-6 py-3 rounded-xl">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Courses Grid -->
        <section aria-labelledby="courses-heading" class="animate-fadeInUp" style="animation-delay: 0.2s;">
          <h2 id="courses-heading" class="sr-only">Courses</h2>
          <div id="courses-list" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div class="col-span-full flex items-center justify-center py-12">
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center animate-pulse">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-5.747-5.747h11.494"></path>
                  </svg>
                </div>
                <p class="text-gray-500 text-lg loading-dots">Loading courses</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
};

export const initCoursesPage = async () => {
    const courseListContainer = document.querySelector('#courses-list');
    if (!courseListContainer) return;

    try {
        const response = await apiClient.get('/courses');
        const courses = response.data;
        
        if (courses.length > 0) {
            courseListContainer.innerHTML = courses.map(course => CourseCard(course)).join('');
        } else {
            courseListContainer.innerHTML = `<p class="text-gray-500 col-span-full">No courses are available at the moment. Please check back later.</p>`;
        }
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        courseListContainer.innerHTML = `<p class="text-red-500 col-span-full">Could not load courses. Please try again later.</p>`;
    }
};

