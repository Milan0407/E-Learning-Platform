export const CourseCard = (course) => {
  return `
    <a href="/courses/${course._id}" data-link class="group block">
      <div class="card-modern hover-lift transition-all duration-300 group-hover:shadow-glow">
        <div class="relative h-48 overflow-hidden rounded-xl mb-6">
          <div class="w-full h-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div class="text-center">
              <svg class="w-16 h-16 text-white mx-auto mb-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-5.747-5.747h11.494"></path>
              </svg>
              <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
          </div>
          <div class="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
            ${course.lessons.length} lessons
          </div>
        </div>
        
        <div class="space-y-3">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
            ${course.title}
          </h3>
          
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600">by ${course.teacher ? course.teacher.name : 'Unknown Teacher'}</p>
          </div>
          
          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center space-x-1 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Self-paced</span>
            </div>
            <div class="flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors duration-300">
              Start Learning
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
};

