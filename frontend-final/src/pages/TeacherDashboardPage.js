import apiClient from '../apiClient';
import { escapeHtml } from '../utils/escapeHtml';
import { getUser } from '../auth';

let latestCourses = [];

const TeacherStyles = () => `
  <style>
    .teacher-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
        radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
      padding: 24px 0 52px;
    }

    .teacher-shell {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .teacher-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      align-items: stretch;
      gap: 16px;
      margin-bottom: 16px;
    }

    .teacher-hero-main {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background:
        linear-gradient(135deg, #ffffff 0%, #f8fafc 64%),
        radial-gradient(circle at 88% 18%, rgba(64, 97, 161, 0.10), transparent 28%);
      padding: 26px 28px;
      color: #111827;
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
      overflow: hidden;
      position: relative;
    }

    .teacher-hero-main::after {
      content: '';
      position: absolute;
      right: 22px;
      top: 24px;
      width: 76px;
      height: 76px;
      border-radius: 22px;
      background: rgba(64, 97, 161, 0.08);
      transform: rotate(10deg);
    }

    .teacher-eyebrow {
      color: #4061a1;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .teacher-title {
      margin-top: 8px;
      max-width: 760px;
      color: #111827;
      font-size: clamp(28px, 3.4vw, 42px);
      line-height: 1.12;
      font-weight: 900;
      letter-spacing: 0;
      position: relative;
      z-index: 1;
    }

    .teacher-subtitle {
      margin-top: 14px;
      max-width: 720px;
      color: #64748b;
      font-size: 15px;
      line-height: 1.75;
      position: relative;
      z-index: 1;
    }

    .teacher-hero-side {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background:
        linear-gradient(135deg, #4061a1 0%, #334b84 100%);
      padding: 22px;
      box-shadow: 0 16px 40px rgba(64, 97, 161, 0.16);
      color: #ffffff;
    }

    .teacher-hero-side-label {
      color: rgba(255, 255, 255, 0.80);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .teacher-hero-stat {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }

    .teacher-hero-stat-item {
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.12);
      padding: 14px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      text-align: center;
    }

    .teacher-hero-stat-value {
      display: block;
      color: #ffffff;
      font-size: 24px;
      line-height: 1;
      font-weight: 900;
    }

    .teacher-hero-stat-label {
      display: block;
      margin-top: 8px;
      color: rgba(255, 255, 255, 0.80);
      font-size: 11px;
      line-height: 1.4;
      font-weight: 850;
    }

    .teacher-stats {
      display: none;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .teacher-stat {
      min-height: 102px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      padding: 18px;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
    }

    .teacher-stat-label {
      color: #64748b;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .teacher-stat-value {
      margin-top: 12px;
      color: #111827;
      font-size: 30px;
      line-height: 1;
      font-weight: 900;
    }

    .teacher-stat-detail {
      margin-top: 8px;
      color: #64748b;
      font-size: 13px;
      font-weight: 650;
    }

    .teacher-workspace {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      gap: 16px;
      align-items: start;
    }

    .teacher-panel {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
      overflow: hidden;
    }

    .teacher-panel-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 20px 22px;
      border-bottom: 1px solid #eef2f7;
      background: #ffffff;
    }

    .teacher-panel-title {
      color: #111827;
      font-size: 20px;
      line-height: 1.2;
      font-weight: 900;
      letter-spacing: 0;
    }

    .teacher-panel-subtitle {
      margin-top: 6px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    .teacher-panel-pill {
      display: inline-flex;
      align-items: center;
      min-height: 32px;
      border-radius: 999px;
      background: #f4f6fb;
      color: #4061a1;
      padding: 0 11px;
      font-size: 12px;
      font-weight: 900;
      white-space: nowrap;
    }

    .teacher-course-list {
      display: grid;
      padding: 8px 0;
    }

    .teacher-course-row {
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr) 132px;
      align-items: center;
      gap: 16px;
      padding: 17px 22px;
      border-bottom: 1px solid #f1f5f9;
    }

    .teacher-course-row:last-child {
      border-bottom: 0;
    }

    .teacher-course-icon {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: #f4f6fb;
      color: #4061a1;
    }

    .teacher-course-icon svg {
      width: 23px;
      height: 23px;
    }

    .teacher-course-title {
      color: #111827;
      font-weight: 900;
      font-size: 16px;
      line-height: 1.35;
    }

    .teacher-course-description {
      margin-top: 6px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .teacher-course-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 11px;
      color: #64748b;
      font-size: 12px;
      font-weight: 750;
    }

    .teacher-meta-pill {
      display: inline-flex;
      align-items: center;
      min-height: 26px;
      border-radius: 999px;
      background: #f8fafc;
      padding: 0 9px;
    }

    .teacher-course-actions {
      display: flex;
      justify-content: flex-end;
    }

    .teacher-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      min-width: 112px;
      border: 1px solid rgba(64, 97, 161, 0.22);
      border-radius: 12px;
      background: #f8fafc;
      color: #4061a1;
      font-size: 13px;
      font-weight: 900;
      text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
    }

    .teacher-action:hover {
      background: #f4f6fb;
      border-color: rgba(64, 97, 161, 0.34);
      transform: translateY(-1px);
    }

    .teacher-form-panel {
      position: sticky;
      top: 98px;
      padding: 20px;
    }

    .teacher-form-title {
      color: #111827;
      font-size: 19px;
      line-height: 1.25;
      font-weight: 900;
    }

    .teacher-form-help {
      margin: 7px 0 18px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    .teacher-create-form {
      display: grid;
      gap: 12px;
    }

    .teacher-input {
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
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    textarea.teacher-input {
      min-height: 132px;
      padding-top: 13px;
      resize: vertical;
    }

    .teacher-input:focus {
      border-color: rgba(64, 97, 161, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
    }

    .teacher-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 48px;
      border: 0;
      border-radius: 13px;
      background: #4061a1;
      color: #ffffff;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 16px 32px rgba(64, 97, 161, 0.20);
      transition: background 0.2s ease, opacity 0.2s ease;
    }

    .teacher-submit:hover {
      background: #334b84;
    }

    .teacher-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .teacher-status {
      min-height: 22px;
      color: #4061a1;
      font-size: 13px;
      font-weight: 800;
    }

    .teacher-empty {
      display: grid;
      justify-items: center;
      padding: 48px 24px;
      text-align: center;
    }

    .teacher-empty-icon {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: #f4f6fb;
      color: #4061a1;
      font-weight: 900;
    }

    .teacher-empty h3 {
      margin-top: 14px;
      color: #111827;
      font-size: 18px;
      font-weight: 900;
    }

    .teacher-empty p {
      margin-top: 7px;
      max-width: 380px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    @media (max-width: 980px) {
      .teacher-hero,
      .teacher-workspace {
        grid-template-columns: 1fr;
      }

      .teacher-form-panel {
        position: static;
      }
    }

    @media (max-width: 720px) {
      .teacher-shell {
        width: min(100% - 28px, 1180px);
      }

      .teacher-hero-main {
        padding: 24px;
      }

      .teacher-stats {
        grid-template-columns: 1fr;
      }

      .teacher-panel-header {
        display: block;
      }

      .teacher-panel-pill {
        margin-top: 14px;
      }

      .teacher-course-row {
        grid-template-columns: 1fr;
      }

      .teacher-course-actions {
        justify-content: flex-start;
      }
    }
  </style>
`;

const StatTile = (label, value, detail) => `
  <div class="teacher-stat">
    <p class="teacher-stat-label">${label}</p>
    <p class="teacher-stat-value">${value}</p>
    <p class="teacher-stat-detail">${detail}</p>
  </div>
`;

const formatDate = (value) => {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const CourseIcon = () => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19.5A2.5 2.5 0 016.5 17H20V5H6.5A2.5 2.5 0 004 7.5v12zm0-12.5l8 4.5 8-4.5" />
  </svg>
`;

const TeacherCourseRows = (courses) => courses.map(course => {
  const courseId = encodeURIComponent(course?._id || '');
  const lessonCount = Array.isArray(course?.lessons) ? course.lessons.length : 0;
  const lessonLabel = lessonCount === 1 ? '1 lesson' : `${lessonCount} lessons`;
  const createdAt = formatDate(course?.createdAt);

  return `
    <article class="teacher-course-row">
      <div class="teacher-course-icon">${CourseIcon()}</div>
      <div>
        <h3 class="teacher-course-title">${escapeHtml(course?.title || 'Untitled Course')}</h3>
        <p class="teacher-course-description">${escapeHtml(course?.description || 'No description')}</p>
        <div class="teacher-course-meta">
          <span class="teacher-meta-pill">${lessonLabel}</span>
          <span class="teacher-meta-pill">Created ${createdAt}</span>
        </div>
      </div>
      <div class="teacher-course-actions">
        <a href="/teacher/course/${courseId}" data-link class="teacher-action">Manage</a>
      </div>
    </article>
  `;
}).join('');

const updateTeacherStats = () => {
  const courseCount = latestCourses.length;
  const lessonCount = latestCourses.reduce((sum, course) => (
    sum + (Array.isArray(course?.lessons) ? course.lessons.length : 0)
  ), 0);

  const courseCountEl = document.querySelector('#teacher-course-count');
  const lessonCountEl = document.querySelector('#teacher-lesson-count');

  if (courseCountEl) courseCountEl.textContent = courseCount;
  if (lessonCountEl) lessonCountEl.textContent = lessonCount;
};

export const TeacherDashboardPage = () => {
  const welcomeName = getUser()?.name?.split(' ')[0] || 'Instructor';

  return `
    ${TeacherStyles()}
    <div class="teacher-page">
      <section class="teacher-shell">
        <div class="teacher-hero">
          <div class="teacher-hero-main">
            <p class="teacher-eyebrow">Teacher Workspace</p>
            <h1 class="teacher-title">Welcome back, ${escapeHtml(welcomeName)}.</h1>
            <p class="teacher-subtitle">Manage your courses, add video lessons, and keep your student learning catalog organized from one calm workspace.</p>
          </div>
          <aside class="teacher-hero-side">
            <p class="teacher-hero-side-label">Your Workspace</p>
            <div class="teacher-hero-stat">
              <div class="teacher-hero-stat-item">
                <span class="teacher-hero-stat-value" id="teacher-course-count">0</span>
                <span class="teacher-hero-stat-label">Courses</span>
              </div>
              <div class="teacher-hero-stat-item">
                <span class="teacher-hero-stat-value" id="teacher-lesson-count">0</span>
                <span class="teacher-hero-stat-label">Lessons</span>
              </div>
            </div>
          </aside>
        </div>

        <div id="teacher-stats-section" class="teacher-stats">
          ${StatTile('Courses', 0, 'courses created')}
          ${StatTile('Lessons', 0, 'lessons uploaded')}
          ${StatTile('Publishing', 'Start', 'create your first course')}
        </div>

        <div class="teacher-workspace">
          <section class="teacher-panel">
            <div class="teacher-panel-header">
              <div>
                <h2 class="teacher-panel-title">Course library</h2>
                <p class="teacher-panel-subtitle">Select a course to upload lessons, preview content, and continue building your curriculum.</p>
              </div>
              <span class="teacher-panel-pill">Owned by you</span>
            </div>
            <div id="teacher-courses-list" class="teacher-course-list">
              <div class="teacher-empty">
                <div class="teacher-empty-icon">...</div>
                <h3>Loading courses</h3>
                <p>Your course library is being prepared.</p>
              </div>
            </div>
          </section>

          <aside class="teacher-panel teacher-form-panel">
            <h2 class="teacher-form-title">Create a new course</h2>
            <p class="teacher-form-help">Start with a clear title and description. You can add video lessons after the course is created.</p>
            <form id="create-course-form" class="teacher-create-form">
  <input
    id="title"
    name="title"
    type="text"
    required
    class="teacher-input"
    placeholder="Course title"
  >

  <textarea
    id="description"
    name="description"
    rows="4"
    required
    class="teacher-input"
    placeholder="Short course description"
  ></textarea>

  <select id="category" name="category" class="teacher-input">
    <option value="Programming">Programming</option>
    <option value="Cybersecurity">Cybersecurity</option>
    <option value="AI">AI</option>
    <option value="Data Science">Data Science</option>
    <option value="Mathematics">Mathematics</option>
    <option value="General">General</option>
  </select>

  <button type="submit" class="teacher-submit">
    Create course
  </button>

  <p id="create-course-status" class="teacher-status"></p>
</form>
          </aside>
        </div>
      </section>
    </div>
  `;
};

export const initTeacherDashboardPage = async () => {
  const courseListContainer = document.querySelector('#teacher-courses-list');
  const createCourseForm = document.querySelector('#create-course-form');
  const status = document.querySelector('#create-course-status');

  const renderCourses = (courses) => {
    latestCourses = Array.isArray(courses) ? courses : [];
    updateTeacherStats();
    if (!courseListContainer) return;

    if (latestCourses.length > 0) {
      courseListContainer.innerHTML = TeacherCourseRows(latestCourses);
    } else {
      courseListContainer.innerHTML = `
        <div class="teacher-empty">
          <div class="teacher-empty-icon">+</div>
          <h3>No courses created yet</h3>
          <p>Use the create course panel to add your first course and begin building lessons for students.</p>
        </div>
      `;
    }
  };

  const fetchAndRenderCourses = async () => {
    try {
      const response = await apiClient.get('/users/teacher/courses');
      renderCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch teacher courses:', error);
      if (courseListContainer) {
        courseListContainer.innerHTML = `
          <div class="teacher-empty">
            <div class="teacher-empty-icon">!</div>
            <h3>Could not load courses</h3>
            <p>Please refresh the page or try again later.</p>
          </div>
        `;
      }
    }
  };

  createCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createCourseForm);
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const button = createCourseForm.querySelector('button');

    try {
      button.disabled = true;
      status.style.color = '#4061a1';
      status.textContent = 'Creating course...';
      await apiClient.post('/courses', {
  title,
  description,
  category
});
      createCourseForm.reset();
      status.textContent = 'Course created.';
      await fetchAndRenderCourses();
      setTimeout(() => {
        status.textContent = '';
      }, 2500);
    } catch (error) {
      console.error('Failed to create course:', error);
      status.textContent = error.response?.data?.msg || 'Failed to create course.';
      status.style.color = '#b91c1c';
    } finally {
      button.disabled = false;
    }
  });

  fetchAndRenderCourses();
};
