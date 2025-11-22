import apiClient from '../apiClient';
import axios from 'axios';

let currentCourseId = null;
let cancelTokenSource = null;

// A simple video player component, similar to the one on the student page
const VideoPlayer = (videoUrl) => {
    return `
        <div class="aspect-video w-full">
            <video controls autoplay class="w-full h-full rounded-lg bg-black">
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
};

export const ManageCoursePage = () => {
  const pathParts = window.location.pathname.split('/');
  currentCourseId = pathParts[pathParts.length - 1];

  return `
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div id="course-details-container">
            <p class="text-gray-500">Loading course details...</p>
        </div>

        <section aria-labelledby="lessons-heading" class="mt-8">
          <h2 id="lessons-heading" class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Uploaded Lessons</h2>
          <div id="lessons-list" class="mt-6 space-y-4">
            <p class="text-gray-500">Loading lessons...</p>
          </div>
        </section>

        <section aria-labelledby="upload-lesson-heading" class="mt-16 pt-12 border-t border-gray-200">
           <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
              <h2 id="upload-lesson-heading" class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">Upload a New Lesson</h2>
           </div>
           <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
              <form id="upload-lesson-form" class="space-y-6">
                <div>
                  <label for="lesson-title" class="block text-sm font-medium leading-6 text-gray-900">Lesson Title</label>
                  <div class="mt-2">
                    <input id="lesson-title" name="title" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                  </div>
                </div>
                <div>
                  <label for="lesson-video" class="block text-sm font-medium leading-6 text-gray-900">Video File</label>
                  <div class="mt-2">
                    <input id="lesson-video" name="video" type="file" accept="video/*" required class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none">
                  </div>
                </div>
                <div>
                  <button type="submit" id="upload-button" class="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed">
                    <span id="button-text">Upload Lesson</span>
                  </button>
                  <div id="progress-container" class="hidden mt-4">
                    <div class="flex justify-between mb-1">
                      <span id="progress-label" class="text-base font-medium text-indigo-700"></span>
                      <span id="progress-percentage" class="text-sm font-medium text-indigo-700"></span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div id="progress-bar" class="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <div class="text-right mt-2">
                        <button type="button" id="cancel-upload-button" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none">Cancel</button>
                    </div>
                  </div>
                  <div id="upload-status" class="mt-4 text-center text-sm font-medium"></div>
                </div>
              </form>
           </div>
        </section>
      </div>
    </div>
  `;
};

export const initManageCoursePage = async () => {
    const lessonsList = document.querySelector('#lessons-list');
    const courseDetailsContainer = document.querySelector('#course-details-container');
    // --- ADDED MISSING VARIABLE DEFINITIONS ---
    const uploadForm = document.querySelector('#upload-lesson-form');
    const uploadButton = document.querySelector('#upload-button');
    const uploadStatus = document.querySelector('#upload-status');
    const progressContainer = document.querySelector('#progress-container');
    const progressBar = document.querySelector('#progress-bar');
    const progressLabel = document.querySelector('#progress-label');
    const progressPercentage = document.querySelector('#progress-percentage');
    const cancelUploadButton = document.querySelector('#cancel-upload-button');

    const fetchCourseData = async () => {
        try {
            const response = await apiClient.get(`/courses/${currentCourseId}`);
            const course = response.data;

            courseDetailsContainer.innerHTML = `
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">${course.title}</h1>
                <p class="mt-4 text-gray-500">${course.description}</p>
            `;

            if (course.lessons && course.lessons.length > 0) {
                lessonsList.innerHTML = course.lessons.map(lesson => `
                    <div class="lesson-item-teacher p-4 border rounded-md shadow-sm bg-gray-50" data-video-url="${lesson.videoUrl}">
                        <div class="flex justify-between items-center">
                            <p class="font-medium text-gray-900">${lesson.title}</p>
                            <button class="preview-video-btn text-sm font-semibold text-indigo-600 hover:text-indigo-500">Preview Video</button>
                        </div>
                        <div class="video-preview-container mt-4 hidden"></div>
                    </div>
                `).join('');
            } else {
                lessonsList.innerHTML = `<p class="text-gray-500">No lessons have been uploaded for this course yet.</p>`;
            }
        } catch (error) {
            console.error('Failed to fetch course data:', error);
            courseDetailsContainer.innerHTML = `<p class="text-red-500">Could not load course data.</p>`;
        }
    };
    
    const resetUploadUI = () => {
        uploadButton.disabled = false;
        progressContainer.classList.add('hidden');
        uploadForm.reset();
    };

    // --- THIS ENTIRE BLOCK OF CODE WAS MISSING ---
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        cancelTokenSource = axios.CancelToken.source();

        uploadButton.disabled = true;
        uploadStatus.textContent = '';
        progressContainer.classList.remove('hidden');
        progressBar.style.width = '0%';
        progressPercentage.textContent = '0%';
        progressLabel.textContent = 'Uploading to server...';
        
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
            cancelToken: cancelTokenSource.token,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                progressBar.style.width = `${percentCompleted}%`;
                progressPercentage.textContent = `${percentCompleted}%`;
            }
        };

        try {
            await apiClient.post(`/courses/${currentCourseId}/lessons`, formData, config);
            progressLabel.textContent = 'Processing on server...';
            progressPercentage.textContent = '';
            
            uploadStatus.textContent = 'Upload successful!';
            uploadStatus.classList.add('text-green-600');
            fetchCourseData();

        } catch (error) {
            if (axios.isCancel(error)) {
                uploadStatus.textContent = 'Upload cancelled.';
                uploadStatus.classList.add('text-yellow-600');
            } else {
                console.error('Failed to upload lesson:', error);
                uploadStatus.textContent = 'Upload failed. Please try again.';
                uploadStatus.classList.add('text-red-500');
            }
        } finally {
            setTimeout(() => {
                resetUploadUI();
                uploadStatus.textContent = '';
            }, 5000);
        }
    });
    
    cancelUploadButton.addEventListener('click', () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Upload cancelled by the user.');
        }
    });
    // --- END OF MISSING CODE BLOCK ---

    lessonsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('preview-video-btn')) {
            const lessonItem = e.target.closest('.lesson-item-teacher');
            const videoUrl = lessonItem.dataset.videoUrl;
            const previewContainer = lessonItem.querySelector('.video-preview-container');

            document.querySelectorAll('.video-preview-container').forEach(container => {
                if (container !== previewContainer) {
                    container.innerHTML = '';
                    container.classList.add('hidden');
                    // Reset other buttons' text
                    container.closest('.lesson-item-teacher').querySelector('.preview-video-btn').textContent = 'Preview Video';
                }
            });

            if (previewContainer.classList.contains('hidden')) {
                previewContainer.innerHTML = VideoPlayer(videoUrl);
                previewContainer.classList.remove('hidden');
                e.target.textContent = 'Close Preview';
            } else {
                previewContainer.innerHTML = '';
                previewContainer.classList.add('hidden');
                e.target.textContent = 'Preview Video';
            }
        }
    });

    fetchCourseData();
};

