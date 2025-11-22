import apiClient from '../apiClient';
import { getUser } from '../auth';

// Helper function to create the HTML for the video player
const VideoPlayer = (videoUrl) => {
    if (!videoUrl) {
        return `<div class="aspect-video w-full bg-gray-200 flex items-center justify-center rounded-lg">
                    <p class="text-gray-500">Select a lesson to begin.</p>
                </div>`;
    }
    return `
        <div class="aspect-video w-full">
            <video controls autoplay class="w-full h-full rounded-lg bg-black">
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
};


export const CourseDetailsPage = () => {
    return `
        <div class="bg-white">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <!-- This container will hold either the enrollment prompt or the video player -->
                <div id="main-content-container">
                    <p class="text-gray-500">Loading course...</p>
                </div>
            </div>
        </div>
    `;
};


export const initCourseDetailsPage = async () => {
    const mainContentContainer = document.querySelector('#main-content-container');
    const courseId = window.location.pathname.split('/').pop();
    const user = getUser();

    if (!user) {
        // This case should be handled by the router, but as a fallback:
        mainContentContainer.innerHTML = `<p class="text-red-500 text-center">You must be logged in to view this page.</p>`;
        return;
    }

    try {
        const courseResponse = await apiClient.get(`/courses/${courseId}`);
        const course = courseResponse.data;

        // --- THIS IS THE CRUCIAL FIX ---
        // If the logged-in user is a teacher, just show a simple read-only view.
        if (user.role === 'teacher') {
            mainContentContainer.innerHTML = `
                <div class="text-center">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">${course.title}</h1>
                    <p class="mt-4 text-lg text-gray-600">${course.description}</p>
                    <p class="mt-2 text-sm text-gray-500">Taught by: ${course.teacher.name}</p>
                    <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p class="text-sm text-yellow-700">This is a preview of the student view. To manage this course, please go to your <a href="/teacher-dashboard" data-link class="font-bold underline">Teacher Dashboard</a>.</p>
                    </div>
                </div>
            `;
            return; // Stop execution here for teachers
        }


        // If the user is a student, proceed with the enrollment check.
        if (user.role === 'student') {
            const userResponse = await apiClient.get('/users/student/courses');
            const enrolledCourses = userResponse.data;
            const isEnrolled = enrolledCourses.some(enrolledCourse => enrolledCourse._id === courseId);

            if (isEnrolled) {
                // If enrolled, show the video player and lessons
                mainContentContainer.innerHTML = `
                    <div class="lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
                        <div class="lg:col-span-2">
                            <div id="video-player-container"></div>
                            <div id="course-info-container" class="mt-8">
                                <h1 class="text-3xl font-bold tracking-tight text-gray-900">${course.title}</h1>
                                <p class="mt-4 text-gray-600">${course.description}</p>
                                <p class="mt-2 text-sm text-gray-500">Taught by: ${course.teacher.name}</p>
                            </div>
                        </div>
                        <div class="mt-12 lg:mt-0 lg:col-span-1">
                            <div class="p-6 bg-gray-50 rounded-lg shadow-sm">
                                <h2 class="text-lg font-bold text-gray-900">Course Lessons</h2>
                                <div id="lessons-list-container" class="mt-4 space-y-3"></div>
                            </div>
                        </div>
                    </div>
                `;
                
                const videoPlayerContainer = document.querySelector('#video-player-container');
                const lessonsListContainer = document.querySelector('#lessons-list-container');

                if (course.lessons && course.lessons.length > 0) {
                    lessonsListContainer.innerHTML = course.lessons.map((lesson, index) => `
                        <button class="lesson-item w-full text-left p-3 rounded-md transition hover:bg-gray-200" data-video-url="${lesson.videoUrl}">
                            <span class="font-medium text-gray-800">${index + 1}. ${lesson.title}</span>
                        </button>
                    `).join('');
                    
                    videoPlayerContainer.innerHTML = VideoPlayer(course.lessons[0].videoUrl);

                    lessonsListContainer.addEventListener('click', (e) => {
                        const lessonButton = e.target.closest('.lesson-item');
                        if (lessonButton) {
                            videoPlayerContainer.innerHTML = VideoPlayer(lessonButton.dataset.videoUrl);
                        }
                    });

                } else {
                    lessonsListContainer.innerHTML = '<p class="text-sm text-gray-500">No lessons uploaded yet.</p>';
                    videoPlayerContainer.innerHTML = VideoPlayer(null);
                }

            } else {
                // If not enrolled, show the enrollment prompt
                mainContentContainer.innerHTML = `
                    <div class="text-center">
                        <h1 class="text-3xl font-bold tracking-tight text-gray-900">${course.title}</h1>
                        <p class="mt-4 text-lg text-gray-600">${course.description}</p>
                        <p class="mt-2 text-sm text-gray-500">Taught by: ${course.teacher.name}</p>
                        <div class="mt-8">
                            <button id="enroll-button" class="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500">
                                Enroll Now to Start Learning
                            </button>
                        </div>
                    </div>
                `;

                document.querySelector('#enroll-button').addEventListener('click', async () => {
                    try {
                        await apiClient.post(`/courses/${courseId}/enroll`);
                        alert('Enrollment successful! You can now access the course.');
                        window.location.reload();
                    } catch (error) {
                        console.error('Enrollment failed:', error);
                        alert('Enrollment failed. Please try again.');
                    }
                });
            }
        }

    } catch (error) {
        console.error('Failed to load course page:', error);
        mainContentContainer.innerHTML = `<p class="text-red-500 text-center">Could not load course. Please try again.</p>`;
    }
};

