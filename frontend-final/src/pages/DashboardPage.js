import apiClient from '../apiClient';
import { CourseCard } from '../components/CourseCard';
import { getUser } from '../auth';

export const DashboardPage = () => {
    const user = getUser();
    // This line is now safer. It checks for user AND user.name before splitting.
    const welcomeName = user && user.name ? user.name.split(' ')[0] : 'Student';

    return `
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Welcome back, ${welcomeName}!</h1>
        <p class="mt-4 max-w-xl text-sm text-gray-700">Continue your learning journey. Select a course below to pick up where you left off.</p>

        <section aria-labelledby="enrolled-courses-heading" class="mt-8">
          <h2 id="enrolled-courses-heading" class="text-xl font-bold tracking-tight text-gray-900">My Enrolled Courses</h2>
          <div id="enrolled-courses-list" class="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <p class="text-gray-500 col-span-full">Loading your enrolled courses...</p>
          </div>
        </section>
      </div>
    </div>
  `;
};

export const initDashboardPage = async () => {
    const courseListContainer = document.querySelector('#enrolled-courses-list');
    if (!courseListContainer) return;

    try {
        const response = await apiClient.get('/users/student/courses');
        const courses = response.data;
        
        if (courses.length > 0) {
            courseListContainer.innerHTML = courses.map(course => CourseCard(course)).join('');
        } else {
            courseListContainer.innerHTML = `
                <div class="text-center col-span-full py-12">
                    <h3 class="text-lg font-medium text-gray-900">You haven't enrolled in any courses yet.</h3>
                    <p class="mt-1 text-sm text-gray-500">Explore the courses and start learning today!</p>
                    <div class="mt-6">
                        <a href="/courses" data-link class="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                            Browse All Courses
                        </a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to fetch enrolled courses:', error);
        courseListContainer.innerHTML = `<p class="text-red-500 col-span-full">Could not load your courses. Please try again later.</p>`;
    }
};

