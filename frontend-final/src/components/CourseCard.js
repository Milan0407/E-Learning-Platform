import { escapeHtml } from '../utils/escapeHtml';

const CourseCardStyles = () => `
  <style>
    .course-card-link {
      display: block;
      height: 100%;
      color: inherit;
      text-decoration: none;
    }

    .course-card {
      height: 100%;
      min-height: 352px;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 18px;
      background: #ffffff;
      overflow: hidden;
      box-shadow: 0 18px 44px rgba(15, 23, 42, 0.07);
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .course-card-link:hover .course-card {
      transform: translateY(-4px);
      border-color: rgba(64, 97, 161, 0.24);
      box-shadow: 0 28px 70px rgba(15, 23, 42, 0.12);
    }

    .course-card-cover {
      position: relative;
      min-height: 136px;
      background:
        linear-gradient(135deg, rgba(64, 97, 161, 0.95) 0%, rgba(23, 32, 51, 0.96) 64%),
        radial-gradient(circle at 78% 22%, rgba(214, 139, 26, 0.34), transparent 32%);
      overflow: hidden;
    }

    .course-card-cover::before {
      content: '';
      position: absolute;
      inset: 18px 20px auto auto;
      width: 90px;
      height: 90px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 28px;
      transform: rotate(12deg);
    }

    .course-card-cover::after {
      content: '';
      position: absolute;
      left: 22px;
      bottom: 22px;
      width: 118px;
      height: 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.20);
      box-shadow: 0 20px 0 rgba(255, 255, 255, 0.12), 0 40px 0 rgba(255, 255, 255, 0.08);
    }

    .course-card-icon {
      position: absolute;
      left: 20px;
      top: 20px;
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      backdrop-filter: blur(8px);
    }

    .course-card-icon svg {
      width: 25px;
      height: 25px;
    }

    .course-card-badge {
      position: absolute;
      right: 16px;
      bottom: 16px;
      display: inline-flex;
      align-items: center;
      min-height: 30px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.92);
      padding: 0 11px;
      color: #334155;
      font-size: 12px;
      font-weight: 850;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.16);
    }

    .course-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .course-card-title {
      min-height: 52px;
      color: #111827;
      font-size: 18px;
      line-height: 1.38;
      font-weight: 900;
      letter-spacing: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      transition: color 0.2s ease;
    }

    .course-card-link:hover .course-card-title {
      color: #4061a1;
    }

    .course-card-teacher {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 16px;
      min-width: 0;
    }

    .course-card-avatar {
      flex: 0 0 auto;
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: #f4f6fb;
      color: #4061a1;
      font-size: 14px;
      font-weight: 900;
    }

    .course-card-teacher-text {
      min-width: 0;
    }

    .course-card-teacher-text span {
      display: block;
      color: #94a3b8;
      font-size: 11px;
      line-height: 1.2;
      font-weight: 850;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .course-card-teacher-text strong {
      display: block;
      margin-top: 3px;
      color: #475569;
      font-size: 13px;
      line-height: 1.25;
      font-weight: 800;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .course-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border-top: 1px solid #eef2f7;
      margin-top: auto;
      padding-top: 18px;
    }

    .course-card-meta {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #64748b;
      font-size: 13px;
      font-weight: 750;
    }

    .course-card-meta svg {
      width: 16px;
      height: 16px;
      color: #94a3b8;
    }

    .course-card-action {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #4061a1;
      font-size: 13px;
      font-weight: 900;
      white-space: nowrap;
    }

    .course-card-action svg {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
    }

    .course-card-link:hover .course-card-action svg {
      transform: translateX(3px);
    }
  </style>
`;

const ensureCourseCardStyles = () => {
  if (typeof document === 'undefined' || document.getElementById('course-card-styles')) return;

  const style = document.createElement('style');
  style.id = 'course-card-styles';
  style.textContent = CourseCardStyles().replace(/<\/?style>/g, '');
  document.head.appendChild(style);
};

const getInitial = (name) => {
  const trimmed = String(name || '').trim();
  return trimmed ? escapeHtml(trimmed.charAt(0).toUpperCase()) : 'T';
};

export const CourseCard = (course) => {
  const courseId = encodeURIComponent(course?._id || '');
  const lessonCount = Array.isArray(course?.lessons) ? course.lessons.length : 0;
  const teacherName = escapeHtml(course?.teacher?.name || 'Unknown Teacher');
  const courseTitle = escapeHtml(course?.title || 'Untitled Course');
  const teacherInitial = getInitial(course?.teacher?.name || 'Teacher');
  const lessonLabel = lessonCount === 1 ? '1 lesson' : `${lessonCount} lessons`;
  ensureCourseCardStyles();

  return `
    <a href="/courses/${courseId}" data-link class="course-card-link">
      <article class="course-card">
        <div class="course-card-cover" aria-hidden="true">
          <div class="course-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19.5A2.5 2.5 0 016.5 17H20V5H6.5A2.5 2.5 0 004 7.5v12zm0-12.5l8 4.5 8-4.5" />
            </svg>
          </div>
          <span class="course-card-badge">${lessonLabel}</span>
        </div>

        <div class="course-card-body">
          <h3 class="course-card-title">${courseTitle}</h3>

          <div class="course-card-teacher">
            <div class="course-card-avatar">${teacherInitial}</div>
            <div class="course-card-teacher-text">
              <span>Instructor</span>
              <strong>${teacherName}</strong>
            </div>
          </div>

          <div class="course-card-footer">
            <div class="course-card-meta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="9" stroke-width="2"></circle>
                <path d="M12 7v5l3 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span>Self-paced</span>
            </div>
            <div class="course-card-action">
              Open course
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </a>
  `;
};
