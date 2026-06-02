import apiClient from '../apiClient';
import { CourseCard } from '../components/CourseCard';
import { getUser } from '../auth';
import { escapeHtml } from '../utils/escapeHtml';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const DashboardStyles = () => `
  <style>
    .dashboard-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
        radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
      padding: 24px 0 52px;
    }

    .dashboard-shell {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .dashboard-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      align-items: stretch;
      gap: 16px;
      margin-bottom: 16px;
    }

    .dashboard-hero-main {
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

    .dashboard-hero-main::after {
      content: '';
      position: absolute;
      right: 22px;
      top: 22px;
      width: 76px;
      height: 76px;
      border-radius: 22px;
      background: rgba(64, 97, 161, 0.08);
      transform: rotate(10deg);
    }

    .dashboard-eyebrow {
      color: #4061a1;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .dashboard-title {
      margin-top: 8px;
      max-width: 760px;
      color: #111827;
      font-size: clamp(30px, 3.6vw, 44px);
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: 0;
      position: relative;
      z-index: 1;
    }

    .dashboard-subtitle {
      margin-top: 14px;
      max-width: 720px;
      color: #64748b;
      font-size: 15px;
      line-height: 1.75;
      position: relative;
      z-index: 1;
    }

    .dashboard-hero-side {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background:
        linear-gradient(135deg, #4061a1 0%, #334b84 100%);
      padding: 22px;
      box-shadow: 0 16px 40px rgba(64, 97, 161, 0.16);
      color: #ffffff;
    }

    .dashboard-hero-side-label {
      color: rgba(255, 255, 255, 0.80);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .dashboard-hero-stat {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }

    .dashboard-hero-stat-item {
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.12);
      padding: 14px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      text-align: center;
    }

    .dashboard-hero-stat-value {
      display: block;
      color: #ffffff;
      font-size: 24px;
      line-height: 1;
      font-weight: 900;
    }

    .dashboard-hero-stat-label {
      display: block;
      margin-top: 8px;
      color: rgba(255, 255, 255, 0.80);
      font-size: 11px;
      line-height: 1.4;
      font-weight: 850;
    }

    .dashboard-stats {
      display: none;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .dashboard-stat {
      min-height: 102px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      padding: 18px;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
    }

    .dashboard-stat-primary {
      background: #4061a1;
      color: #ffffff;
      box-shadow: 0 18px 48px rgba(64, 97, 161, 0.16);
    }

    .dashboard-stat-label {
      color: #64748b;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .dashboard-stat-primary .dashboard-stat-label {
      color: rgba(255, 255, 255, 0.78);
    }

    .dashboard-stat-value {
      margin-top: 12px;
      color: #111827;
      font-size: 30px;
      line-height: 1;
      font-weight: 900;
    }

    .dashboard-stat-primary .dashboard-stat-value {
      color: #ffffff;
    }

    .dashboard-stat-detail {
      margin-top: 8px;
      color: #64748b;
      font-size: 13px;
      font-weight: 650;
    }

    .dashboard-stat-primary .dashboard-stat-detail {
      color: rgba(255, 255, 255, 0.68);
    }

    .dashboard-workspace {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      align-items: start;
    }

    .dashboard-panel {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
      overflow: hidden;
    }

    .dashboard-panel-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 20px 22px;
      border-bottom: 1px solid #eef2f7;
      background: #ffffff;
    }

    .dashboard-panel-title {
      color: #111827;
      font-size: 20px;
      line-height: 1.2;
      font-weight: 900;
      letter-spacing: 0;
    }

    .dashboard-panel-subtitle {
      margin-top: 6px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    .dashboard-search-box {
      position: relative;
      width: 100%;
      max-width: 380px;
    }

    .dashboard-search-input {
      width: 100%;
      min-height: 48px;
      border: 1px solid #dbe3ef;
      border-radius: 13px;
      background: #f8fafc;
      padding: 0 50px 0 14px;
      color: #111827;
      font-size: 14px;
      font-weight: 650;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .dashboard-search-input:focus {
      border-color: rgba(64, 97, 161, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
    }

    .dashboard-search-icon {
      position: absolute;
      inset: 0 28px 0 auto;
      display: grid;
      place-items: center;
      color: #94a3b8;
      pointer-events: none;
    }

    .dashboard-search-icon svg {
      width: 18px;
      height: 18px;
    }

    .dashboard-course-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding: 20px;
    }

    .dashboard-profile-card {
      display: grid;
      gap: 16px;
      padding: 20px;
    }

    .dashboard-profile-section {
      border-radius: 16px;
      background: #f8fafc;
      padding: 18px;
    }

    .dashboard-profile-label {
      color: #64748b;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .dashboard-profile-name {
      display: block;
      margin-top: 12px;
      color: #111827;
      font-size: 20px;
      line-height: 1.25;
      font-weight: 900;
    }

    .dashboard-profile-badge {
      display: inline-flex;
      align-items: center;
      margin-top: 12px;
      border-radius: 999px;
      background: #f4f6fb;
      color: #4061a1;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 900;
    }

    .dashboard-continue-card {
      border: 1px dashed rgba(15, 23, 42, 0.12);
      border-radius: 16px;
      background: #f8fafc;
      padding: 16px;
      text-align: center;
      min-height: 120px;
      display: grid;
      place-items: center;
    }

    .dashboard-continue-content {
      display: grid;
      gap: 12px;
    }

    .dashboard-continue-label {
      color: #64748b;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .dashboard-continue-title {
      color: #111827;
      font-size: 16px;
      line-height: 1.4;
      font-weight: 900;
    }

    .dashboard-continue-next {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
    }

    .dashboard-continue-progress {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 12px;
    }

    .dashboard-continue-stat {
      border-radius: 12px;
      background: #ffffff;
      padding: 12px;
      border: 1px solid #e2e8f0;
    }

    .dashboard-continue-stat-label {
      color: #64748b;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .dashboard-continue-stat-value {
      display: block;
      margin-top: 8px;
      color: #111827;
      font-size: 18px;
      font-weight: 900;
    }

    .dashboard-empty {
      display: grid;
      justify-items: center;
      padding: 48px 24px;
      text-align: center;
      border: 1px dashed rgba(15, 23, 42, 0.12);
      border-radius: 16px;
      background: #f8fafc;
      color: #64748b;
    }

    .dashboard-empty-icon {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: #e2e8f0;
      color: #4061a1;
      font-size: 24px;
      font-weight: 900;
    }

    .dashboard-empty h3 {
      margin-top: 14px;
      color: #111827;
      font-size: 18px;
      font-weight: 900;
    }

    .dashboard-empty p {
      margin-top: 7px;
      max-width: 380px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    .dashboard-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 12px;
      min-height: 40px;
      border: 0;
      border-radius: 12px;
      background: #4061a1;
      color: #ffffff;
      padding: 0 16px;
      font-size: 13px;
      font-weight: 900;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .dashboard-button:hover {
      background: #334b84;
      transform: translateY(-1px);
    }

    .dashboard-continue-button {
      width: 100%;
      margin-top: 12px;
    }

    .dashboard-profile-panel {
      display: none;
    }

    @media (max-width: 980px) {
      .dashboard-hero,
      .dashboard-workspace {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 720px) {
      .dashboard-shell {
        width: min(100% - 28px, 1180px);
      }

      .dashboard-hero-main {
        padding: 20px;
      }

      .dashboard-stats {
        grid-template-columns: 1fr;
      }

      .dashboard-panel-header {
        display: block;
      }

      .dashboard-course-list {
        grid-template-columns: 1fr;
      }

      .dashboard-search-box {
        max-width: 100%;
      }
    }
  </style>
`;

export const DashboardPage = () => {
  const user = getUser();
  const welcomeName = user && user.name ? user.name : 'Student';

  return `
    ${DashboardStyles()}
    <div class="dashboard-page">
      <section class="dashboard-shell">
        <div class="dashboard-hero">
          <div class="dashboard-hero-main">
            <p class="dashboard-eyebrow">Student Dashboard</p>
            <h1 class="dashboard-title">Welcome back, ${escapeHtml(welcomeName)}!</h1>
            <p class="dashboard-subtitle">Your dashboard now gives you quick progress insights, recommended next lessons, and instant access to your enrolled courses.</p>
          </div>
          <aside class="dashboard-hero-side">
            <p class="dashboard-hero-side-label">Your Learning</p>
            <div class="dashboard-hero-stat">
              <div class="dashboard-hero-stat-item">
                <span class="dashboard-hero-stat-value" id="student-course-count">0</span>
                <span class="dashboard-hero-stat-label">Courses</span>
              </div>
              <div class="dashboard-hero-stat-item">
                <span class="dashboard-hero-stat-value" id="student-lesson-count">0</span>
                <span class="dashboard-hero-stat-label">Lessons</span>
              </div>
            </div>
          </aside>
        </div>

        <div id="dashboard-stats-section" class="dashboard-stats">
          <!-- Stats will be populated by JavaScript -->
        </div>

        <div class="dashboard-workspace">
          <section class="dashboard-panel">
            <div class="dashboard-panel-header">
              <div>
                <h2 class="dashboard-panel-title">My Enrolled Courses</h2>
                <p class="dashboard-panel-subtitle">Search, review progress, and continue your active learning path.</p>
              </div>
            </div>
            <div class="dashboard-search-box" style="padding: 16px 22px; border-bottom: 1px solid #eef2f7;">
              <input id="course-search-input" type="search" placeholder="Search courses..." class="dashboard-search-input" />
              <span class="dashboard-search-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
                  <path d="M16.65 16.65L21 21" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </span>
            </div>
            <div id="enrolled-courses-list" class="dashboard-course-list">
              <div class="dashboard-empty" style="grid-column: 1 / -1;">
                <div class="dashboard-empty-icon">...</div>
                <h3>Loading your courses...</h3>
                <p>Getting your enrolled courses ready.</p>
              </div>
            </div>
          </section>

          <aside class="dashboard-panel dashboard-profile-panel">
            <!-- Profile panel hidden -->
          </aside>
        </div>
      </section>
    </div>
  `;
};

const StatTile = (label, value, detail) => `
  <div class="dashboard-stat">
    <p class="dashboard-stat-label">${label}</p>
    <p class="dashboard-stat-value">${value}</p>
    <p class="dashboard-stat-detail">${detail}</p>
  </div>
`;

const StatTilePrimary = (label, value, detail) => `
  <div class="dashboard-stat dashboard-stat-primary">
    <p class="dashboard-stat-label">${label}</p>
    <p class="dashboard-stat-value">${value}</p>
    <p class="dashboard-stat-detail">${detail}</p>
  </div>
`;

const updateDashboardStats = (statsContainer, totalEnrolled, totalLessons, completedLessons) => {
  const studentCourseCount = document.querySelector('#student-course-count');
  const studentLessonCount = document.querySelector('#student-lesson-count');
  if (studentCourseCount) studentCourseCount.textContent = totalEnrolled;
  if (studentLessonCount) studentLessonCount.textContent = totalLessons;

  if (!statsContainer) return;
  statsContainer.innerHTML = `
    ${StatTilePrimary('Enrolled', totalEnrolled, totalEnrolled === 1 ? 'course' : 'courses')}
    ${StatTile('Completed', completedLessons, 'lessons tracked')}
    ${StatTile('Total Lessons', totalLessons, 'across all courses')}
  `;
};

export const initDashboardPage = async () => {
  const courseListContainer = document.querySelector('#enrolled-courses-list');
  const continueLearningCard = document.querySelector('#continue-learning-card');
  const searchInput = document.querySelector('#course-search-input');
  const statsContainer = document.querySelector('#dashboard-stats-section');

  if (!courseListContainer || !searchInput) return;

  const progressData = JSON.parse(localStorage.getItem('studentCourseProgress') || '{}');

  const renderCourses = (courses) => {
    if (!courses || courses.length === 0) {
      courseListContainer.innerHTML = `
        <div class="dashboard-empty" style="grid-column: 1 / -1; padding: 60px 24px;">
          <div class="dashboard-empty-icon">+</div>
          <h3>No courses enrolled yet</h3>
          <p>Start your learning journey by exploring and enrolling in available courses.</p>
          <a href="/courses" data-link class="dashboard-button">Browse Courses</a>
        </div>
      `;
      return;
    }

    courseListContainer.innerHTML = courses.map(course => CourseCard(course)).join('');
  };

  try {
    const response = await apiClient.get('/users/student/courses');
    const courses = response.data;

    const enrichedCourses = Array.isArray(courses) ? courses.map((course) => {
      const lessonCount = Array.isArray(course.lessons) ? course.lessons.length : 0;
      const completedLessons = Number(progressData[course._id] || 0);
      const progress = lessonCount > 0 ? Math.min(100, Math.round((completedLessons / lessonCount) * 100)) : 0;
      const nextLesson = course.lessons?.[completedLessons] || course.lessons?.[0] || null;
      return {
        ...course,
        completedLessons,
        progress,
        nextLessonTitle: nextLesson ? nextLesson.title : 'Start your first lesson',
        enrollmentDate: course.createdAt ? formatDate(course.createdAt) : 'Unknown date',
        statusLabel: progress >= 100 ? 'Completed' : progress > 0 ? 'In progress' : 'Not started'
      };
    }) : [];

    const totalEnrolled = enrichedCourses.length;
    const totalLessons = enrichedCourses.reduce((sum, course) => sum + (Array.isArray(course.lessons) ? course.lessons.length : 0), 0);
    const completedLessons = enrichedCourses.reduce((sum, course) => sum + (course.completedLessons || 0), 0);

    // Update stats section
    updateDashboardStats(statsContainer, totalEnrolled, totalLessons, completedLessons);

    // Render courses
    renderCourses(enrichedCourses);

    // Update continue learning card (if it exists)
    if (continueLearningCard && enrichedCourses.length > 0) {
      const continueCourse = enrichedCourses.reduce((best, course) => {
        if (!best) return course;
        if (course.progress > best.progress) return course;
        if (course.progress === best.progress && new Date(course.createdAt) > new Date(best.createdAt)) return course;
        return best;
      }, null);

      if (continueCourse) {
        continueLearningCard.innerHTML = `
          <div class="dashboard-continue-content">
            <p class="dashboard-continue-label">Continue Learning</p>
            <h3 class="dashboard-continue-title">${escapeHtml(continueCourse.title)}</h3>
            <p class="dashboard-continue-next">${escapeHtml(continueCourse.nextLessonTitle)}</p>
            <div class="dashboard-continue-progress">
              <div class="dashboard-continue-stat">
                <p class="dashboard-continue-stat-label">Progress</p>
                <span class="dashboard-continue-stat-value">${continueCourse.progress}%</span>
              </div>
              <div class="dashboard-continue-stat">
                <p class="dashboard-continue-stat-label">Added</p>
                <span class="dashboard-continue-stat-value" style="font-size: 13px;">${continueCourse.enrollmentDate}</span>
              </div>
            </div>
            <a href="/courses/${encodeURIComponent(continueCourse._id)}" data-link class="dashboard-button dashboard-continue-button">Resume Course</a>
          </div>
        `;
      } else {
        if (continueLearningCard) {
          continueLearningCard.innerHTML = `
            <div class="dashboard-continue-content">
              <p class="dashboard-continue-label">No Active Course</p>
              <p class="dashboard-continue-next">Enroll in a course to see it here.</p>
            </div>
          `;
        }
      }
    } else if (continueLearningCard) {
      continueLearningCard.innerHTML = `
        <div class="dashboard-continue-content">
          <p class="dashboard-continue-label">Get Started</p>
          <p class="dashboard-continue-next">Enroll in your first course to begin learning.</p>
        </div>
      `;
    }

    // Filter courses by search
    const filterCourses = (searchValue) => {
      const normalizedQuery = searchValue.trim().toLowerCase();
      if (!normalizedQuery) {
        renderCourses(enrichedCourses);
        return;
      }

      const filtered = enrichedCourses.filter((course) => {
        const title = course.title?.toLowerCase() || '';
        const teacherName = course.teacher?.name?.toLowerCase() || '';
        return title.includes(normalizedQuery) || teacherName.includes(normalizedQuery);
      });

      if (filtered.length > 0) {
        renderCourses(filtered);
      } else {
        courseListContainer.innerHTML = `
          <div class="dashboard-empty" style="grid-column: 1 / -1;">
            <div class="dashboard-empty-icon">?</div>
            <h3>No results found</h3>
            <p>Try a different search term to find your courses.</p>
          </div>
        `;
      }
    };

    searchInput.addEventListener('input', (event) => {
      filterCourses(event.target.value);
    });
  } catch (error) {
    console.error('Failed to fetch enrolled courses:', error);
    if (courseListContainer) {
      courseListContainer.innerHTML = `
        <div class="dashboard-empty" style="grid-column: 1 / -1; background: #fee2e2; border-color: rgba(220, 38, 38, 0.2);">
          <div class="dashboard-empty-icon" style="background: #fecaca; color: #dc2626;">!</div>
          <h3 style="color: #dc2626;">Could not load courses</h3>
          <p>Please refresh the page or try again later.</p>
        </div>
      `;
    }
  }
};

