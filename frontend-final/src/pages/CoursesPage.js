import apiClient from '../apiClient';
import { CourseCard } from '../components/CourseCard';

const CoursesStyles = () => `
  <style>
    .courses-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
        radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
      padding: 24px 0 52px;
    }

    .courses-shell {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .courses-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      align-items: stretch;
      gap: 16px;
      margin-bottom: 16px;
    }

    .courses-hero-main,
    .courses-hero-side,
    .courses-toolbar,
    .courses-panel {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
    }

    .courses-hero-main {
      background:
        linear-gradient(135deg, #ffffff 0%, #f8fafc 64%),
        radial-gradient(circle at 88% 18%, rgba(64, 97, 161, 0.10), transparent 28%);
      padding: 26px 28px;
      overflow: hidden;
      position: relative;
    }

    .courses-hero-main::after {
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

    .courses-eyebrow {
      color: #4061a1;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .courses-title {
      position: relative;
      z-index: 1;
      max-width: 760px;
      margin-top: 8px;
      color: #111827;
      font-size: clamp(30px, 3.6vw, 44px);
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: 0;
    }

    .courses-subtitle {
      position: relative;
      z-index: 1;
      max-width: 720px;
      margin-top: 14px;
      color: #64748b;
      font-size: 15px;
      line-height: 1.75;
    }

    .courses-hero-side {
      background: linear-gradient(135deg, #4061a1 0%, #334b84 100%);
      padding: 22px;
      color: #ffffff;
      box-shadow: 0 16px 40px rgba(64, 97, 161, 0.16);
    }

    .courses-side-label {
      color: rgba(255, 255, 255, 0.80);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .courses-side-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }

    .courses-side-stat {
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.12);
      padding: 14px;
      text-align: center;
    }

    .courses-side-stat strong {
      display: block;
      color: #ffffff;
      font-size: 24px;
      line-height: 1;
      font-weight: 900;
    }

    .courses-side-stat span {
      display: block;
      margin-top: 8px;
      color: rgba(255, 255, 255, 0.80);
      font-size: 11px;
      line-height: 1.4;
      font-weight: 850;
    }

    .courses-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-radius: 16px;
      margin-bottom: 16px;
      padding: 16px 18px;
    }

    .courses-search {
      position: relative;
      width: min(480px, 100%);
    }

    .courses-search input {
      width: 100%;
      min-height: 48px;
      border: 1px solid #dbe3ef;
      border-radius: 13px;
      background: #f8fafc;
      padding: 0 44px 0 14px;
      color: #111827;
      font-size: 14px;
      font-weight: 650;
      outline: none;
    }

    .courses-search input:focus {
      border-color: rgba(64, 97, 161, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
    }

    .courses-search svg {
      position: absolute;
      right: 14px;
      top: 50%;
      width: 18px;
      height: 18px;
      color: #94a3b8;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .courses-count {
      color: #64748b;
      font-size: 13px;
      font-weight: 850;
    }

    .courses-panel {
      border-radius: 16px;
      padding: 20px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 18px;
    }

    .courses-empty {
      grid-column: 1 / -1;
      display: grid;
      justify-items: center;
      padding: 48px 24px;
      border: 1px dashed rgba(15, 23, 42, 0.12);
      border-radius: 16px;
      background: #f8fafc;
      color: #64748b;
      text-align: center;
    }

    .courses-empty strong {
      color: #111827;
      font-size: 18px;
      font-weight: 900;
    }

    .courses-empty p {
      margin-top: 7px;
      max-width: 380px;
      font-size: 14px;
      line-height: 1.65;
    }

    @media (max-width: 900px) {
      .courses-hero {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .courses-shell {
        width: min(100% - 28px, 1180px);
      }

      .courses-toolbar {
        align-items: stretch;
        flex-direction: column;
      }
    }
  </style>
`;

const EmptyState = (title, message) => `
  <div class="courses-empty">
    <strong>${title}</strong>
    <p>${message}</p>
  </div>
`;

export const CoursesPage = () => {
  return `
    ${CoursesStyles()}
    <div class="courses-page">
      <section class="courses-shell">
        <div class="courses-hero">
          <div class="courses-hero-main">
            <p class="courses-eyebrow">Course Catalog</p>
            <h1 class="courses-title">Explore courses designed for focused digital learning.</h1>
            <p class="courses-subtitle">Find teacher-created video courses, enroll in the classes that fit your goals, and continue learning from your dashboard.</p>
          </div>
          <aside class="courses-hero-side">
            <p class="courses-side-label">Catalog</p>
            <div class="courses-side-grid">
              <div class="courses-side-stat">
                <strong id="catalog-course-count">0</strong>
                <span>Courses</span>
              </div>
              <div class="courses-side-stat">
                <strong>Free</strong>
                <span>Access</span>
              </div>
            </div>
          </aside>
        </div>

        <div class="courses-toolbar">
          <div class="courses-search">
            <input type="search" placeholder="Search courses or teachers..." id="course-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
              <path d="M16.65 16.65L21 21" stroke-width="2" stroke-linecap="round"></path>
            </svg>
          </div>
          <span class="courses-count" id="catalog-result-count">Loading courses...</span>
        </div>

        <section class="courses-panel" aria-labelledby="courses-heading">
          <h2 id="courses-heading" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Courses</h2>
          <div id="courses-list" class="courses-grid">
            ${EmptyState('Loading courses...', 'Preparing the course catalog.')}
          </div>
        </section>
      </section>
    </div>
  `;
};

export const initCoursesPage = async () => {
  const courseListContainer = document.querySelector('#courses-list');
  const searchInput = document.querySelector('#course-search');
  const resultCount = document.querySelector('#catalog-result-count');
  const courseCount = document.querySelector('#catalog-course-count');
  if (!courseListContainer) return;

  const renderCourses = (courses) => {
    if (resultCount) resultCount.textContent = `${courses.length} ${courses.length === 1 ? 'course' : 'courses'} shown`;

    if (courses.length > 0) {
      courseListContainer.innerHTML = courses.map(course => CourseCard(course)).join('');
    } else {
      courseListContainer.innerHTML = EmptyState('No courses found', 'Try a different search term or check back later.');
    }
  };

  try {
    const response = await apiClient.get('/courses');
    const courses = Array.isArray(response.data) ? response.data : [];
    if (courseCount) courseCount.textContent = courses.length;

    renderCourses(courses);

    searchInput?.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase();
      if (!query) {
        renderCourses(courses);
        return;
      }

      const filtered = courses.filter((course) => {
        const title = course?.title?.toLowerCase() || '';
        const teacher = course?.teacher?.name?.toLowerCase() || '';
        return title.includes(query) || teacher.includes(query);
      });
      renderCourses(filtered);
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    if (resultCount) resultCount.textContent = 'Unable to load catalog';
    courseListContainer.innerHTML = EmptyState('Could not load courses', 'Please refresh the page or try again later.');
  }
};
