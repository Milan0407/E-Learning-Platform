import apiClient from '../apiClient';
import { getUser } from '../auth';
import { escapeHtml } from '../utils/escapeHtml';

const CourseDetailsStyles = () => `
  <style>
    .course-detail-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
        radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
      padding: 24px 0 52px;
    }

    .course-detail-shell {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .course-detail-card,
    .course-player-card,
    .course-lessons-card {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
      overflow: hidden;
    }

    .course-detail-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 16px;
      align-items: stretch;
    }

    .course-detail-main {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background:
        linear-gradient(135deg, #ffffff 0%, #f8fafc 64%),
        radial-gradient(circle at 88% 18%, rgba(64, 97, 161, 0.10), transparent 28%);
      padding: 26px 28px;
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    }

    .course-detail-eyebrow {
      color: #4061a1;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .course-detail-title {
      margin-top: 8px;
      color: #111827;
      font-size: clamp(30px, 3.6vw, 44px);
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: 0;
    }

    .course-detail-copy {
      max-width: 760px;
      margin-top: 8px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.75;
    }

    .course-detail-meta {
      display: inline-flex;
      align-items: center;
      margin-top: 18px;
      border-radius: 999px;
      background: #f4f6fb;
      color: #4061a1;
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 900;
    }

    .course-detail-side {
      border-radius: 20px;
      background: linear-gradient(135deg, #4061a1 0%, #334b84 100%);
      padding: 22px;
      color: #ffffff;
      box-shadow: 0 16px 40px rgba(64, 97, 161, 0.16);
    }

    .course-detail-side-label {
      color: rgba(255, 255, 255, 0.80);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .course-detail-side strong {
      display: block;
      margin-top: 14px;
      font-size: 24px;
      line-height: 1.1;
      font-weight: 900;
    }

    .course-detail-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      border: 0;
      border-radius: 13px;
      background: #4061a1;
      color: #ffffff;
      padding: 0 18px;
      font-size: 14px;
      font-weight: 900;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 16px 32px rgba(64, 97, 161, 0.20);
    }

    .course-detail-button:hover {
      background: #334b84;
    }

    .course-detail-button-light {
      width: 100%;
      margin-top: 18px;
      background: #ffffff;
      color: #4061a1;
      box-shadow: none;
    }

    .course-learning-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 340px;
      gap: 16px;
      align-items: start;
    }

    .course-player {
      aspect-ratio: 16 / 9;
      width: 100%;
      background: #111827;
        // display: grid;
        // place-items: center;
        // color: #cbd5e1;
    }

    .course-player video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #000000;
    }

    .course-info {
      padding: 22px;
    }

    .course-lessons-card {
      padding: 20px;
      position: sticky;
      top: 98px;
    }

    .course-lessons-title {
      color: #111827;
      font-size: 19px;
      font-weight: 900;
    }

    .lessons-list {
      display: grid;
      gap: 10px;
      margin-top: 16px;
    }

    .lesson-item {
  width: 100%;
  border: 1px solid #dbe3ef;
  border-radius: 13px;
  background: #f8fafc;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lesson-item:hover {
  border-color: rgba(64, 97, 161, 0.34);
  background: #f4f6fb;
}

.lesson-thumbnail {
  width: 90px;
  height: 54px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.lesson-number {
  color: #4061a1;
  font-size: 12px;
  font-weight: 800;
}

.lesson-title {
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
}

    .course-state {
      display: grid;
      justify-items: center;
      padding: 64px 24px;
      border: 1px dashed rgba(15, 23, 42, 0.12);
      border-radius: 16px;
      background: #ffffff;
      color: #64748b;
      text-align: center;
    }

    @media (max-width: 900px) {
      .course-detail-hero,
      .course-learning-grid {
        grid-template-columns: 1fr;
      }

      .course-lessons-card {
        position: static;
      }
    }

    @media (max-width: 640px) {
      .course-detail-shell {
        width: min(100% - 28px, 1180px);
      }
    }
  </style>
`;

const VideoPlayer = (videoUrl) => {
  if (!videoUrl) {
    return `<div class="course-player"><p>Select a lesson to begin.</p></div>`;
  }
  const safeVideoUrl = escapeHtml(videoUrl);
  return `
    <div class="course-player">
      <video controls autoplay>
        <source src="${safeVideoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
};

const getTeacherName = (course) => escapeHtml(course?.teacher?.name || 'Unknown Teacher');

export const CourseDetailsPage = () => {
  return `
    ${CourseDetailsStyles()}
    <div class="course-detail-page">
      <section class="course-detail-shell">
        <div id="main-content-container">
          <div class="course-state">
            <strong>Loading course...</strong>
            <p>Preparing the course details.</p>
          </div>
        </div>
      </section>
    </div>
  `;
};

export const initCourseDetailsPage = async () => {
  const mainContentContainer = document.querySelector('#main-content-container');
  const courseId = window.location.pathname.split('/').pop();
  const user = getUser();

  if (!user) {
    mainContentContainer.innerHTML = `<div class="course-state"><strong>Login required</strong><p>You must be logged in to view this page.</p></div>`;
    return;
  }

  try {
    const courseResponse = await apiClient.get(`/courses/${courseId}`);
    const course = courseResponse.data;
    const teacherName = getTeacherName(course);
    const courseTitle = escapeHtml(course?.title || 'Untitled Course');
    const courseDescription = escapeHtml(course?.description || '');
    const lessonCount = Array.isArray(course?.lessons) ? course.lessons.length : 0;

    if (user.role === 'teacher') {
      mainContentContainer.innerHTML = `
        <div class="course-detail-hero">
          <div class="course-detail-main">
            <p class="course-detail-eyebrow">Course Preview</p>
            <h1 class="course-detail-title">${courseTitle}</h1>
            <p class="course-detail-copy">${courseDescription}</p>
            <span class="course-detail-meta">Taught by ${teacherName}</span>
          </div>
          <aside class="course-detail-side">
            <p class="course-detail-side-label">Teacher view</p>
            <strong>${lessonCount} ${lessonCount === 1 ? 'lesson' : 'lessons'}</strong>
            <a href="/teacher-dashboard" data-link class="course-detail-button course-detail-button-light">Go to dashboard</a>
          </aside>
        </div>
      `;
      return;
    }

    if (user.role === 'student') {
      const userResponse = await apiClient.get('/users/student/courses');
      const enrolledCourses = userResponse.data;
      const isEnrolled = enrolledCourses.some(enrolledCourse => enrolledCourse._id === courseId);

      if (isEnrolled) {
        mainContentContainer.innerHTML = `
          <div class="course-learning-grid">
            <div class="course-player-card">
              <div id="video-player-container"></div>
              <div class="course-info">
                <p class="course-detail-eyebrow">Now Learning</p>
                <h1 class="course-detail-title" style="font-size: clamp(22px, 3vw, 12px);">${courseTitle}</h1>
                <p class="course-detail-copy">${courseDescription}</p>
                <span class="course-detail-meta">Taught by ${teacherName}</span>
              </div>
            </div>
            <aside class="course-lessons-card">
              <h2 class="course-lessons-title">Course lessons</h2>
              <div id="lessons-list-container" class="lessons-list"></div>
            </aside>
          </div>
        `;

        const videoPlayerContainer = document.querySelector('#video-player-container');
        const lessonsListContainer = document.querySelector('#lessons-list-container');

        if (course.lessons && course.lessons.length > 0) {
          lessonsListContainer.innerHTML = course.lessons.map((lesson, index) => `
  <button
    class="lesson-item"
    data-video-url="${escapeHtml(lesson.videoUrl)}"
  >
    ${
      lesson.thumbnailUrl
        ? `
          <img
            src="${escapeHtml(lesson.thumbnailUrl)}"
            alt="${escapeHtml(lesson.title)}"
            class="lesson-thumbnail"
          />
        `
        : ''
    }

    <div class="lesson-info">
      <span class="lesson-number">${index + 1}</span>
      <span class="lesson-title">${escapeHtml(lesson.title)}</span>
    </div>
  </button>
`).join('');

          videoPlayerContainer.innerHTML = VideoPlayer(course.lessons[0].videoUrl);
          lessonsListContainer.addEventListener('click', (e) => {
            const lessonButton = e.target.closest('.lesson-item');
            if (lessonButton) videoPlayerContainer.innerHTML = VideoPlayer(lessonButton.dataset.videoUrl);
          });
        } else {
          lessonsListContainer.innerHTML = '<p class="course-detail-copy">No lessons uploaded yet.</p>';
          videoPlayerContainer.innerHTML = VideoPlayer(null);
        }
      } else {
        mainContentContainer.innerHTML = `
          <div class="course-detail-hero">
            <div class="course-detail-main">
              <p class="course-detail-eyebrow">Course Details</p>
              <h1 class="course-detail-title">${courseTitle}</h1>
              <p class="course-detail-copy">${courseDescription}</p>
              <span class="course-detail-meta">Taught by ${teacherName}</span>
            </div>
            <aside class="course-detail-side">
              <p class="course-detail-side-label">Enroll</p>
              <strong>${lessonCount} ${lessonCount === 1 ? 'lesson' : 'lessons'}</strong>
              <button id="enroll-button" class="course-detail-button course-detail-button-light">Enroll now</button>
            </aside>
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
    mainContentContainer.innerHTML = `<div class="course-state"><strong>Could not load course</strong><p>Please refresh the page or try again later.</p></div>`;
  }
};
