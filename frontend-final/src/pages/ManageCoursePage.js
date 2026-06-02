import apiClient from '../apiClient';
import axios from 'axios';
import { escapeHtml } from '../utils/escapeHtml';

let currentCourseId = null;
let cancelTokenSource = null;

const ManageStyles = () => `
  <style>
    .manage-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
        radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
      padding: 24px 0 52px;
    }

    .manage-shell {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .manage-hero,
    .manage-panel {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
      overflow: hidden;
    }

    .manage-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 16px;
      align-items: stretch;
      border: 0;
      background: transparent;
      box-shadow: none;
      margin-bottom: 16px;
    }

    .manage-hero-main {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background:
        linear-gradient(135deg, #ffffff 0%, #f8fafc 64%),
        radial-gradient(circle at 88% 18%, rgba(64, 97, 161, 0.10), transparent 28%);
      padding: 26px 28px;
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    }

    .manage-hero-side {
      border-radius: 20px;
      background: linear-gradient(135deg, #4061a1 0%, #334b84 100%);
      padding: 22px;
      color: #ffffff;
      box-shadow: 0 16px 40px rgba(64, 97, 161, 0.16);
    }

    .manage-eyebrow,
    .manage-side-label {
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .manage-eyebrow {
      color: #4061a1;
    }

    .manage-side-label {
      color: rgba(255, 255, 255, 0.80);
      font-weight: 900;
    }

    .manage-title {
      margin-top: 8px;
      color: #111827;
      font-size: clamp(30px, 3.6vw, 10px);
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: 0;
    }

    .manage-copy {
      max-width: 760px;
      margin-top: 14px;
      color: #64748b;
      font-size: 15px;
      line-height: 1.75;
    }

    .manage-side-stat {
      display: grid;
      place-items: center;
      margin-top: 16px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.12);
      padding: 18px;
      text-align: center;
    }

    .manage-side-stat strong {
      color: #ffffff;
      font-size: 24px;
      line-height: 1;
      font-weight: 900;
    }

    .manage-side-stat span {
      margin-top: 8px;
      color: rgba(255, 255, 255, 0.80);
      font-size: 12px;
      font-weight: 850;
    }

    .manage-workspace {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      gap: 16px;
      align-items: start;
    }

    .manage-panel-header {
      padding: 20px 22px;
      border-bottom: 1px solid #eef2f7;
    }

    .manage-panel-title {
      color: #111827;
      font-size: 20px;
      line-height: 1.2;
      font-weight: 900;
    }

    .manage-panel-subtitle {
      margin-top: 6px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    .manage-list {
      display: grid;
      gap: 12px;
      padding: 20px 22px;
    }

    .lesson-item-teacher {
      border: 1px solid #dbe3ef;
      border-radius: 14px;
      background: #f8fafc;
      padding: 14px;
    }

    .manage-lesson-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .manage-lesson-title {
      color: #111827;
      font-size: 15px;
      font-weight: 900;
    }

    .preview-video-btn,
    .manage-cancel {
      border: 0;
      background: transparent;
      color: #4061a1;
      font-size: 13px;
      font-weight: 900;
      cursor: pointer;
    }

    .video-preview-container {
      margin-top: 14px;
    }

    .video-preview-container.hidden,
    .hidden {
      display: none;
    }

    .manage-player {
      aspect-ratio: 16 / 9;
      border-radius: 12px;
      overflow: hidden;
      background: #000000;
    }

    .manage-player video {
      width: 100%;
      height: 100%;
      background: #000000;
    }

    .manage-form-panel {
      position: sticky;
      top: 98px;
      padding: 20px;
    }

    .manage-form {
      display: grid;
      gap: 12px;
      margin-top: 18px;
    }

    .manage-label {
      color: #334155;
      font-size: 13px;
      font-weight: 900;
    }

    .manage-input {
      width: 100%;
      min-height: 48px;
      border: 1px solid #dbe3ef;
      border-radius: 13px;
      background: #f8fafc;
      padding: 0 13px;
      color: #111827;
      font-size: 14px;
      font-weight: 650;
      outline: none;
    }

    .manage-input:focus {
      border-color: rgba(64, 97, 161, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
    }

    .manage-file {
      padding: 12px;
      cursor: pointer;
    }

    .manage-submit {
      min-height: 48px;
      border: 0;
      border-radius: 13px;
      background: #4061a1;
      color: #ffffff;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 16px 32px rgba(64, 97, 161, 0.20);
    }

    .manage-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .progress-track {
      width: 100%;
      height: 9px;
      border-radius: 999px;
      background: #e2e8f0;
      overflow: hidden;
    }

    #progress-bar {
      height: 100%;
      border-radius: inherit;
      background: #4061a1;
      transition: width 0.25s ease;
    }

    .manage-status {
      min-height: 22px;
      color: #4061a1;
      font-size: 13px;
      font-weight: 850;
      text-align: center;
    }

    .manage-empty {
      padding: 42px 20px;
      border: 1px dashed rgba(15, 23, 42, 0.12);
      border-radius: 16px;
      background: #f8fafc;
      color: #64748b;
      text-align: center;
    }

    @media (max-width: 980px) {
      .manage-hero,
      .manage-workspace {
        grid-template-columns: 1fr;
      }

      .manage-form-panel {
        position: static;
      }
    }

    @media (max-width: 640px) {
      .manage-shell {
        width: min(100% - 28px, 1180px);
      }
    }
  </style>
`;

const VideoPlayer = (videoUrl) => {
  const safeVideoUrl = escapeHtml(videoUrl);
  return `
    <div class="manage-player">
      <video controls autoplay>
        <source src="${safeVideoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
};

export const ManageCoursePage = () => {
  const pathParts = window.location.pathname.split('/');
  currentCourseId = pathParts[pathParts.length - 1];

  return `
    ${ManageStyles()}
    <div class="manage-page">
      <section class="manage-shell">
        <div id="course-details-container">
          <div class="manage-hero">
            <div class="manage-hero-main">
              <p class="manage-eyebrow">Course Manager</p>
              <h1 class="manage-title">Loading course...</h1>
              <p class="manage-copy">Preparing the course workspace.</p>
            </div>
            <aside class="manage-hero-side">
              <p class="manage-side-label">Lessons</p>
              <div class="manage-side-stat"><strong>0</strong><span>uploaded</span></div>
            </aside>
          </div>
        </div>

        <div class="manage-workspace">
          <section class="manage-panel">
            <div class="manage-panel-header">
              <h2 class="manage-panel-title">Uploaded lessons</h2>
              <p class="manage-panel-subtitle">Preview lesson videos and confirm your course content.</p>
            </div>
            <div id="lessons-list" class="manage-list">
              <div class="manage-empty">Loading lessons...</div>
            </div>
          </section>

          <aside class="manage-panel manage-form-panel">
            <h2 id="upload-lesson-heading" class="manage-panel-title">Upload lesson</h2>
            <p class="manage-panel-subtitle">Add a video lesson to this course. Large uploads may take a moment.</p>
            <form id="upload-lesson-form" class="manage-form">
              <label class="manage-label" for="lesson-title">Lesson title</label>
              <input id="lesson-title" name="title" type="text" required class="manage-input" placeholder="Lesson title">

              <label class="manage-label" for="lesson-video">Video file</label>
              <input id="lesson-video" name="video" type="file" accept="video/*" required class="manage-input manage-file">

              <button type="submit" id="upload-button" class="manage-submit">
                <span id="button-text">Upload lesson</span>
              </button>

              <div id="progress-container" class="hidden">
                <div style="display:flex;justify-content:space-between;gap:12px;margin-bottom:8px;">
                  <span id="progress-label" class="manage-status" style="text-align:left;"></span>
                  <span id="progress-percentage" class="manage-status" style="text-align:right;"></span>
                </div>
                <div class="progress-track">
                  <div id="progress-bar" style="width: 0%"></div>
                </div>
                <div style="text-align:right;margin-top:8px;">
                  <button type="button" id="cancel-upload-button" class="manage-cancel">Cancel upload</button>
                </div>
              </div>

              <div id="upload-status" class="manage-status"></div>
            </form>
          </aside>
        </div>
      </section>
    </div>
  `;
};

export const initManageCoursePage = async () => {
  const lessonsList = document.querySelector('#lessons-list');
  const courseDetailsContainer = document.querySelector('#course-details-container');
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
      const lessonCount = Array.isArray(course?.lessons) ? course.lessons.length : 0;

      courseDetailsContainer.innerHTML = `
        <div class="manage-hero">
          <div class="manage-hero-main">
            <p class="manage-eyebrow">Course Manager</p>
            <h1 class="manage-title">${escapeHtml(course?.title || 'Untitled Course')}</h1>
            <p class="manage-copy">${escapeHtml(course?.description || '')}</p>
          </div>
          <aside class="manage-hero-side">
            <p class="manage-side-label">Lessons</p>
            <div class="manage-side-stat">
              <strong>${lessonCount}</strong>
              <span>${lessonCount === 1 ? 'uploaded lesson' : 'uploaded lessons'}</span>
            </div>
          </aside>
        </div>
      `;

      if (course.lessons && course.lessons.length > 0) {
        lessonsList.innerHTML = course.lessons.map(lesson => `
          <div class="lesson-item-teacher" data-video-url="${escapeHtml(lesson.videoUrl)}">
            <div class="manage-lesson-row">
              <p class="manage-lesson-title">${escapeHtml(lesson.title)}</p>
              <button class="preview-video-btn" type="button">Preview video</button>
            </div>
            <div class="video-preview-container hidden"></div>
          </div>
        `).join('');
      } else {
        lessonsList.innerHTML = `<div class="manage-empty">No lessons have been uploaded for this course yet.</div>`;
      }
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      courseDetailsContainer.innerHTML = `<div class="manage-empty">Could not load course data.</div>`;
    }
  };

  const resetUploadUI = () => {
    uploadButton.disabled = false;
    progressContainer.classList.add('hidden');
    uploadForm.reset();
  };

  const setUploadStatus = (message, className) => {
    uploadStatus.className = `manage-status ${className || ''}`;
    uploadStatus.textContent = message;
  };

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    cancelTokenSource = axios.CancelToken.source();

    uploadButton.disabled = true;
    uploadStatus.textContent = '';
    progressContainer.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
    progressLabel.textContent = 'Uploading...';

    const config = {
      cancelToken: cancelTokenSource.token,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        progressBar.style.width = `${percentCompleted}%`;
        progressPercentage.textContent = `${percentCompleted}%`;
      }
    };

    try {
      await apiClient.post(`/courses/${currentCourseId}/lessons`, formData, config);
      progressLabel.textContent = 'Processing...';
      progressPercentage.textContent = '';
      setUploadStatus('Upload successful!', 'text-green-600');
      fetchCourseData();
    } catch (error) {
      if (axios.isCancel(error)) {
        setUploadStatus('Upload cancelled.', 'text-yellow-600');
      } else {
        console.error('Failed to upload lesson:', error);
        setUploadStatus(error.response?.data?.msg || 'Upload failed. Please try again.', 'text-red-500');
      }
    } finally {
      setTimeout(() => {
        resetUploadUI();
        uploadStatus.textContent = '';
      }, 5000);
    }
  });

  cancelUploadButton.addEventListener('click', () => {
    if (cancelTokenSource) cancelTokenSource.cancel('Upload cancelled by the user.');
  });

  lessonsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('preview-video-btn')) {
      const lessonItem = e.target.closest('.lesson-item-teacher');
      const videoUrl = lessonItem.dataset.videoUrl;
      const previewContainer = lessonItem.querySelector('.video-preview-container');

      document.querySelectorAll('.video-preview-container').forEach(container => {
        if (container !== previewContainer) {
          container.innerHTML = '';
          container.classList.add('hidden');
          container.closest('.lesson-item-teacher').querySelector('.preview-video-btn').textContent = 'Preview video';
        }
      });

      if (previewContainer.classList.contains('hidden')) {
        previewContainer.innerHTML = VideoPlayer(videoUrl);
        previewContainer.classList.remove('hidden');
        e.target.textContent = 'Close preview';
      } else {
        previewContainer.innerHTML = '';
        previewContainer.classList.add('hidden');
        e.target.textContent = 'Preview video';
      }
    }
  });

  fetchCourseData();
};
