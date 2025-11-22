import apiClient from '../apiClient';
import { navigateTo } from '../utils/navigation';


// A simple card component for the teacher's view
const TeacherCourseCard = (course) => {
  return `
    <a href="/teacher/course/${course._id}" data-link class="group block">
      <div class="relative h-48 overflow-hidden rounded-lg shadow-lg group-hover:opacity-75">
        <div class="absolute inset-0 bg-indigo-400"></div>
        <div class="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 class="text-xl font-bold text-white">${course.title}</h3>
            <p class="text-sm text-indigo-100">${course.lessons.length} lessons</p>
        </div>
      </div>
      <p class="mt-2 block truncate text-sm font-medium text-gray-900">Manage Course &rarr;</p>
    </a>
  `;
};


export const TeacherDashboardPage = () => {
  return `
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-baseline sm:justify-between">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">My Courses</h1>
        </div>

        <!-- Section to display existing courses -->
        <section aria-labelledby="courses-heading" class="mt-8">
          <h2 id="courses-heading" class="sr-only">Your created courses</h2>
          <div id="teacher-courses-list" class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <p class="text-gray-500">Loading your courses...</p>
          </div>
        </section>

        <!-- Section to create a new course -->
        <section aria-labelledby="create-course-heading" class="mt-16 pt-12 border-t border-gray-200">
           <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
              <h2 id="create-course-heading" class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">Create a New Course</h2>
              <p class="mt-2 text-center text-sm text-gray-600">Fill out the details below to add a new course to the platform.</p>
           </div>
           <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
              <form id="create-course-form" class="space-y-6">
                <div>
                  <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Course Title</label>
                  <div class="mt-2">
                    <input id="title" name="title" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                  </div>
                </div>
                <div>
                  <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Course Description</label>
                  <div class="mt-2">
                    <textarea id="description" name="description" rows="3" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"></textarea>
                  </div>
                </div>
                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Create Course</button>
                </div>
              </form>
           </div>
        </section>
      </div>
    </div>
  `;
};

export const initTeacherDashboardPage = async () => {
    const courseListContainer = document.querySelector('#teacher-courses-list');
    const createCourseForm = document.querySelector('#create-course-form');

    const fetchAndRenderCourses = async () => {
        try {
            const response = await apiClient.get('/users/teacher/courses');
            const courses = response.data;
            
            if (courses.length > 0) {
                courseListContainer.innerHTML = courses.map(course => TeacherCourseCard(course)).join('');
            } else {
                courseListContainer.innerHTML = `<p class="text-gray-500 col-span-full">You haven't created any courses yet. Use the form below to get started!</p>`;
            }

        } catch (error) {
            console.error('Failed to fetch teacher courses:', error);
            courseListContainer.innerHTML = `<p class="text-red-500 col-span-full">Could not load your courses. Please try again later.</p>`;
        }
    };

    createCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createCourseForm);
        const title = formData.get('title');
        const description = formData.get('description');

        try {
            await apiClient.post('/courses', { title, description });
            createCourseForm.reset();
            fetchAndRenderCourses(); 
            alert('Course created successfully!');
        } catch (error) {
            console.error('Failed to create course:', error);
            alert('Failed to create course. Please try again.');
        }
    });
    
    fetchAndRenderCourses();
};

