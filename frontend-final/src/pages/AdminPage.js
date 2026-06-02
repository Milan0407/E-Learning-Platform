import apiClient from '../apiClient';
import { escapeHtml } from '../utils/escapeHtml';

let activeAdminView = 'teachers';
let selectedTeacherId = null;
let selectedTeacherName = '';

const tabClass = (view) => (
    activeAdminView === view
        ? 'admin-tab admin-tab-active'
        : 'admin-tab'
);

const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const StatTile = (label, value, detail) => `
    <div class="admin-stat">
        <p class="admin-stat-label">${label}</p>
        <p class="admin-stat-value">${value}</p>
        <p class="admin-stat-detail">${detail}</p>
    </div>
`;

const EmptyState = (title, message) => `
    <div class="admin-empty">
        <div class="admin-empty-icon">!</div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
    </div>
`;

const TeacherRows = (teachers) => teachers.map(teacher => `
    <tr>
        <td>
            <div class="admin-identity">
                <span class="admin-avatar">${escapeHtml((teacher?.name || 'T').charAt(0).toUpperCase())}</span>
                <div>
                    <p class="admin-primary-text">${escapeHtml(teacher?.name || 'Unnamed Teacher')}</p>
                    <p class="admin-muted-text">${escapeHtml(teacher?.email || 'No email')}</p>
                </div>
            </div>
        </td>
        <td><span class="admin-count-pill">${teacher?.courseCount || 0}</span></td>
        <td>${formatDate(teacher?.createdAt)}</td>
        <td>
            <div class="admin-actions">
                <button data-teacher-id="${escapeHtml(teacher?._id || '')}" data-teacher-name="${escapeHtml(teacher?.name || 'Unnamed Teacher')}" class="btn-view-teacher-courses admin-action admin-action-primary">Courses</button>
                <button data-teacher-id="${escapeHtml(teacher?._id || '')}" data-teacher-name="${escapeHtml(teacher?.name || '')}" data-teacher-email="${escapeHtml(teacher?.email || '')}" class="btn-edit-teacher admin-action">Edit</button>
                <button data-teacher-id="${escapeHtml(teacher?._id || '')}" data-teacher-name="${escapeHtml(teacher?.name || 'this teacher')}" class="btn-delete-teacher admin-action admin-action-danger">Delete</button>
            </div>
        </td>
    </tr>
`).join('');

const CourseRows = (courses) => courses.map(course => {
    const courseId = escapeHtml(course?._id || '');
    const lessons = Array.isArray(course?.lessons) ? course.lessons : [];

    return `
        <tr>
            <td>
                <p class="admin-primary-text">${escapeHtml(course?.title || 'Untitled Course')}</p>
                <p class="admin-muted-text admin-course-description">${escapeHtml(course?.description || 'No description')}</p>
            </td>
            <td>${escapeHtml(course?.teacher?.name || 'Unknown Teacher')}</td>
            <td><span class="admin-count-pill">${lessons.length}</span></td>
            <td>
                <details class="admin-details">
                    <summary class="admin-link">View lessons</summary>
                    <ul class="admin-lesson-list">
                        ${lessons.length ? lessons.map(lesson => `
                            <li>
                                <span>${escapeHtml(lesson?.title || 'Untitled Lesson')}</span>
                                <button data-course-id="${courseId}" data-lesson-id="${escapeHtml(lesson?._id || '')}" class="btn-delete-lesson admin-link-danger">Delete</button>
                            </li>
                        `).join('') : '<li class="admin-muted-text">No lessons uploaded.</li>'}
                    </ul>
                </details>
            </td>
            <td>
                <button data-course-id="${courseId}" class="btn-delete-course admin-action admin-action-danger">Delete</button>
            </td>
        </tr>
    `;
}).join('');

const AdminStyles = () => `
    <style>
        .admin-page {
            min-height: 100vh;
            background:
                radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
                radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
                linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
            padding: 24px 0 52px;
        }

        .admin-shell {
            width: min(1180px, calc(100% - 40px));
            margin: 0 auto;
        }

        .admin-hero {
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            background:
                radial-gradient(circle at 92% 8%, rgba(214, 139, 26, 0.18), transparent 26%),
                linear-gradient(135deg, #172033 0%, #1d2940 58%, #111827 100%);
            padding: 24px 26px;
            color: #ffffff;
            box-shadow: 0 22px 58px rgba(15, 23, 42, 0.16);
            overflow: hidden;
            position: relative;
            margin-bottom: 16px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            gap: 24px;
        }

        .admin-hero::after {
            content: '';
            position: absolute;
            right: 26px;
            top: 22px;
            width: 92px;
            height: 92px;
            border-radius: 26px;
            background: rgba(255, 255, 255, 0.07);
            transform: rotate(11deg);
        }

        .admin-hero > div {
            position: relative;
            z-index: 1;
        }

        .admin-eyebrow {
            color: rgba(255, 255, 255, 0.70);
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        .admin-title {
            margin-top: 8px;
            max-width: 760px;
            color: #ffffff;
            font-size: clamp(28px, 3.1vw, 40px);
            line-height: 1.12;
            font-weight: 900;
            letter-spacing: 0;
            position: relative;
            z-index: 1;
        }

        .admin-subtitle {
            margin-top: 12px;
            max-width: 650px;
            color: rgba(255, 255, 255, 0.74);
            font-size: 15px;
            line-height: 1.75;
            position: relative;
            z-index: 1;
        }

        .admin-tabs {
            display: inline-flex;
            gap: 6px;
            padding: 6px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.10);
            backdrop-filter: blur(12px);
            position: relative;
            z-index: 1;
        }

        .admin-tab {
            min-width: 110px;
            min-height: 42px;
            border: 0;
            border-radius: 11px;
            color: rgba(255, 255, 255, 0.72);
            background: transparent;
            font-size: 14px;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .admin-tab:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.12);
        }

        .admin-tab-active {
            color: #172033;
            background: #ffffff;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
        }

        .admin-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin-bottom: 16px;
        }

        .admin-stat {
            min-height: 102px;
            border: 1px solid rgba(15, 23, 42, 0.08);
            border-radius: 16px;
            background: #ffffff;
            padding: 18px;
            box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .admin-stat-label {
            color: #64748b;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.10em;
            text-transform: uppercase;
        }

        .admin-stat-value {
            margin-top: 12px;
            color: #111827;
            font-size: 30px;
            line-height: 1;
            font-weight: 900;
        }

        .admin-stat-detail {
            margin-top: 8px;
            color: #64748b;
            font-size: 13px;
            font-weight: 650;
        }

        .admin-workspace {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 360px;
            gap: 16px;
            align-items: start;
        }

        .admin-panel {
            border: 1px solid rgba(15, 23, 42, 0.08);
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
            overflow: hidden;
        }

        .admin-panel.hidden {
            display: none;
        }

        .admin-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            padding: 20px 22px;
            border-bottom: 1px solid #eef2f7;
            background: #ffffff;
        }

        .admin-panel-title {
            color: #111827;
            font-size: 20px;
            line-height: 1.2;
            font-weight: 900;
            letter-spacing: 0;
        }

        .admin-panel-subtitle {
            margin-top: 6px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.65;
        }

        .admin-table-wrap {
            overflow-x: auto;
            padding: 0;
        }

        .admin-table {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
            text-align: left;
        }

        .admin-table th {
            padding: 16px 22px;
            color: #64748b;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.10em;
            text-transform: uppercase;
            border-bottom: 1px solid #e2e8f0;
            background: #f8fafc;
        }

        .admin-table td {
            padding: 16px 22px;
            color: #334155;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: top;
            font-size: 14px;
        }

        .admin-identity {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 0;
        }

        .admin-avatar {
            display: grid;
            place-items: center;
            flex: 0 0 auto;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: #f4f6fb;
            color: #4061a1;
            font-size: 14px;
            font-weight: 900;
        }

        .admin-primary-text {
            color: #111827;
            font-weight: 900;
            font-size: 15px;
        }

        .admin-muted-text {
            margin-top: 4px;
            color: #64748b;
            font-size: 13px;
            line-height: 1.55;
        }

        .admin-course-description {
            max-width: 360px;
        }

        .admin-count-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 32px;
            min-height: 28px;
            border-radius: 999px;
            background: #f4f6fb;
            color: #4061a1;
            padding: 0 10px;
            font-size: 13px;
            font-weight: 900;
        }

        .admin-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .admin-action,
        .admin-filter-button,
        .admin-secondary-button {
            min-height: 36px;
            border: 1px solid #dbe3ef;
            border-radius: 10px;
            background: #ffffff;
            padding: 0 12px;
            color: #334155;
            font-size: 13px;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .admin-action:hover,
        .admin-filter-button:hover,
        .admin-secondary-button:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            transform: translateY(-1px);
        }

        .admin-action-primary {
            border-color: rgba(64, 97, 161, 0.22);
            color: #4061a1;
            background: #f8fafc;
        }

        .admin-action-primary:hover {
            border-color: rgba(64, 97, 161, 0.34);
            background: #f4f6fb;
        }

        .admin-action-danger {
            border-color: #fecaca;
            color: #b91c1c;
            background: #fff7f7;
        }

        .admin-action-danger:hover {
            border-color: #fca5a5;
            background: #fee2e2;
        }

        .admin-link {
            color: #4061a1;
            font-size: 13px;
            font-weight: 900;
            cursor: pointer;
            transition: color 0.2s ease;
        }

        .admin-link:hover {
            color: #334b84;
        }

        .admin-details {
            max-width: 260px;
        }

        .admin-link-danger {
            border: 0;
            background: transparent;
            color: #b91c1c;
            font-size: 13px;
            font-weight: 900;
            cursor: pointer;
            padding: 0;
            transition: color 0.2s ease;
        }

        .admin-link-danger:hover {
            color: #991b1b;
        }

        .admin-lesson-list {
            margin: 10px 0 0;
            padding: 0;
            list-style: none;
        }

        .admin-lesson-list li {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 10px 0;
            border-top: 1px solid #eef2f7;
            color: #475569;
            font-size: 13px;
        }

        .admin-form-panel {
            position: sticky;
            top: 98px;
            padding: 20px;
            border: 1px solid rgba(15, 23, 42, 0.08);
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .admin-form-title {
            color: #111827;
            font-size: 19px;
            line-height: 1.25;
            font-weight: 900;
        }

        .admin-form-help {
            margin: 8px 0 18px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.65;
        }

        .admin-create-form {
            display: grid;
            gap: 12px;
        }

        .admin-input,
        .admin-create-form .input-modern {
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
            transition: all 0.2s ease;
        }

        .admin-input:focus,
        .admin-create-form .input-modern:focus {
            border-color: rgba(64, 97, 161, 0.55);
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
        }

        .admin-submit,
        .admin-create-form .btn-primary {
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
            transition: all 0.2s ease;
        }

        .admin-submit:hover,
        .admin-create-form .btn-primary:hover {
            background: #334b84;
            transform: translateY(-2px);
        }

        .admin-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .admin-empty {
            display: grid;
            justify-items: center;
            padding: 48px 24px;
            text-align: center;
        }

        .admin-empty-icon {
            display: grid;
            place-items: center;
            width: 48px;
            height: 48px;
            border-radius: 14px;
            background: #e2e8f0;
            color: #4061a1;
            font-weight: 900;
            font-size: 24px;
        }

        .admin-empty h3 {
            margin-top: 14px;
            color: #111827;
            font-size: 18px;
            font-weight: 900;
        }

        .admin-empty p {
            margin-top: 7px;
            max-width: 380px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.65;
        }

        .admin-modal {
            position: fixed;
            inset: 0;
            z-index: 50;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(15, 23, 42, 0.52);
            padding: 20px;
        }

        .admin-modal.flex {
            display: flex;
        }

        .admin-modal-card {
            width: 100%;
            max-width: 440px;
            border: 1px solid rgba(15, 23, 42, 0.08);
            border-radius: 18px;
            background: #ffffff;
            padding: 24px;
            box-shadow: 0 28px 70px rgba(15, 23, 42, 0.24);
        }

        .admin-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 18px;
        }

        .admin-modal-actions .btn-primary {
            width: auto;
            min-height: 40px;
            padding: 0 16px;
        }

        .admin-label {
            display: block;
            margin-bottom: 7px;
            color: #334155;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.10em;
            text-transform: uppercase;
        }

        @media (max-width: 980px) {
            .admin-hero {
                grid-template-columns: 1fr;
            }

            .admin-workspace {
                grid-template-columns: 1fr;
            }

            .admin-form-panel {
                position: static;
            }
        }

        @media (max-width: 720px) {
            .admin-shell {
                width: min(100% - 28px, 1180px);
            }

            .admin-hero {
                padding: 20px;
            }

            .admin-stats {
                grid-template-columns: 1fr;
            }

            .admin-panel-header {
                display: block;
            }

            .admin-filter-button {
                margin-top: 12px;
            }

            .admin-table th,
            .admin-table td {
                padding: 12px 16px;
            }
        }
    </style>
`;

export const AdminPage = ({ courses = [], teachers = [] } = {}) => {
    const visibleCourses = selectedTeacherId
        ? courses.filter(course => course?.teacher?._id === selectedTeacherId)
        : courses;

    const totalLessons = courses.reduce((sum, course) => (
        sum + (Array.isArray(course?.lessons) ? course.lessons.length : 0)
    ), 0);

    const teacherCountText = teachers.length === 1 ? 'teacher account' : 'teacher accounts';
    const courseCountText = courses.length === 1 ? 'course published' : 'courses published';
    const lessonCountText = totalLessons === 1 ? 'lesson uploaded' : 'lessons uploaded';

    return `
        ${AdminStyles()}
        <div class="admin-page">
            <section class="admin-shell">
                <div class="admin-hero">
                    <div>
                        <p class="admin-eyebrow">Admin Portal</p>
                        <h1 class="admin-title">Platform control center</h1>
                        <p class="admin-subtitle">Manage teacher access, review course content, and keep the Shiksha Jyoti learning catalog organized.</p>
                    </div>
                    <div class="admin-tabs" role="tablist" aria-label="Admin sections">
                        <button id="admin-view-teachers" class="${tabClass('teachers')}" type="button">Teachers</button>
                        <button id="admin-view-courses" class="${tabClass('courses')}" type="button">Courses</button>
                    </div>
                </div>

                <div class="admin-stats">
                    ${StatTile('Teachers', teachers.length, teacherCountText)}
                    ${StatTile('Courses', courses.length, courseCountText)}
                    ${StatTile('Lessons', totalLessons, lessonCountText)}
                </div>

                <div class="admin-workspace">
                    <div>
                        <section id="teachers-section" class="admin-panel ${activeAdminView === 'teachers' ? '' : 'hidden'}">
                            <div class="admin-panel-header">
                                <div>
                                    <h2 class="admin-panel-title">Teacher accounts</h2>
                                    <p class="admin-panel-subtitle">View course ownership, edit teacher details, or remove teacher accounts with their associated courses.</p>
                                </div>
                            </div>
                            <div class="admin-table-wrap">
                                ${teachers.length ? `
                                    <table class="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Teacher</th>
                                                <th>Courses</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>${TeacherRows(teachers)}</tbody>
                                    </table>
                                ` : EmptyState('No teachers found', 'Create a teacher account from the side panel to begin publishing courses.')}
                            </div>
                        </section>

                        <section id="courses-section" class="admin-panel ${activeAdminView === 'courses' ? '' : 'hidden'}">
                            <div class="admin-panel-header">
                                <div>
                                    <h2 class="admin-panel-title">Courses${selectedTeacherId ? ` by ${escapeHtml(selectedTeacherName)}` : ''}</h2>
                                    <p class="admin-panel-subtitle">Review course ownership, inspect uploaded lessons, and remove content when needed.</p>
                                </div>
                                ${selectedTeacherId ? '<button id="clear-course-filter" type="button" class="admin-filter-button">Show all courses</button>' : ''}
                            </div>
                            <div class="admin-table-wrap">
                                ${visibleCourses.length ? `
                                    <table class="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Course</th>
                                                <th>Teacher</th>
                                                <th>Count</th>
                                                <th>Lessons</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>${CourseRows(visibleCourses)}</tbody>
                                    </table>
                                ` : EmptyState('No courses found', selectedTeacherId ? 'This teacher has not created courses yet.' : 'Courses created by teachers will appear here.')}
                            </div>
                        </section>
                    </div>

                    <aside class="admin-panel admin-form-panel">
                        <h2 class="admin-form-title">Create user</h2>
                        <p class="admin-form-help">Create teacher and admin accounts. Student accounts are created through public registration.</p>
                        <form id="create-user-form" class="admin-create-form">
                            <input name="name" placeholder="Full name" class="admin-input" required>
                            <input name="email" type="email" placeholder="Email address" class="admin-input" required>
                            <input name="password" type="password" placeholder="Temporary password" class="admin-input" required>
                            <select name="role" class="admin-input">
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button class="admin-submit">Create user</button>
                        </form>
                    </aside>
                </div>

                <div id="edit-teacher-modal" class="admin-modal hidden">
                    <div class="admin-modal-card">
                        <div>
                            <h2 class="admin-panel-title">Edit teacher</h2>
                            <p class="admin-panel-subtitle">Leave password empty to keep the current password.</p>
                        </div>
                        <form id="edit-teacher-form" class="admin-create-form" style="margin-top: 18px;">
                            <input type="hidden" name="teacherId" id="edit-teacher-id">
                            <div>
                                <label for="edit-teacher-name" class="admin-label">Name</label>
                                <input id="edit-teacher-name" name="name" class="admin-input" required>
                            </div>
                            <div>
                                <label for="edit-teacher-email" class="admin-label">Email</label>
                                <input id="edit-teacher-email" name="email" type="email" class="admin-input" required>
                            </div>
                            <div>
                                <label for="edit-teacher-password" class="admin-label">New password</label>
                                <input id="edit-teacher-password" name="password" type="password" class="admin-input">
                            </div>
                            <div class="admin-modal-actions">
                                <button type="button" id="cancel-edit-teacher" class="admin-secondary-button">Cancel</button>
                                <button class="btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    `;
};

export const initAdminPage = async () => {
    const load = async () => {
        try {
            const [coursesRes, teachersRes] = await Promise.all([
                apiClient.get('/admin/courses'),
                apiClient.get('/admin/teachers'),
            ]);
            const container = document.getElementById('page-content');
            container.innerHTML = AdminPage({
                courses: coursesRes.data,
                teachers: teachersRes.data,
            });
            attachHandlers();
        } catch (err) {
            console.error('Failed to load admin data', err);
            document.getElementById('page-content').innerHTML = `<div class="admin-page"><div class="admin-shell">${EmptyState('Failed to load admin data', 'Refresh the page or try again later.')}</div></div>`;
        }
    };

    const openEditModal = ({ id, name, email }) => {
        document.getElementById('edit-teacher-id').value = id;
        document.getElementById('edit-teacher-name').value = name;
        document.getElementById('edit-teacher-email').value = email;
        document.getElementById('edit-teacher-password').value = '';
        document.getElementById('edit-teacher-modal').classList.remove('hidden');
        document.getElementById('edit-teacher-modal').classList.add('flex');
    };

    const closeEditModal = () => {
        document.getElementById('edit-teacher-modal').classList.add('hidden');
        document.getElementById('edit-teacher-modal').classList.remove('flex');
    };

    const attachHandlers = () => {
        document.getElementById('admin-view-teachers')?.addEventListener('click', () => {
            activeAdminView = 'teachers';
            selectedTeacherId = null;
            selectedTeacherName = '';
            load();
        });

        document.getElementById('admin-view-courses')?.addEventListener('click', () => {
            activeAdminView = 'courses';
            selectedTeacherId = null;
            selectedTeacherName = '';
            load();
        });

        document.getElementById('clear-course-filter')?.addEventListener('click', () => {
            activeAdminView = 'courses';
            selectedTeacherId = null;
            selectedTeacherName = '';
            load();
        });

        document.querySelectorAll('.btn-view-teacher-courses').forEach(btn => {
            btn.addEventListener('click', (e) => {
                selectedTeacherId = e.target.dataset.teacherId;
                selectedTeacherName = e.target.dataset.teacherName || 'Teacher';
                activeAdminView = 'courses';
                load();
            });
        });

        document.querySelectorAll('.btn-edit-teacher').forEach(btn => {
            btn.addEventListener('click', (e) => {
                openEditModal({
                    id: e.target.dataset.teacherId,
                    name: e.target.dataset.teacherName || '',
                    email: e.target.dataset.teacherEmail || '',
                });
            });
        });

        document.getElementById('cancel-edit-teacher')?.addEventListener('click', closeEditModal);

        document.getElementById('edit-teacher-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const teacherId = formData.get('teacherId');

            try {
                await apiClient.put(`/admin/teachers/${teacherId}`, {
                    name: formData.get('name').trim(),
                    email: formData.get('email').trim(),
                    password: formData.get('password').trim(),
                });
                closeEditModal();
                load();
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to update teacher');
                console.error(err);
            }
        });

        document.querySelectorAll('.btn-delete-teacher').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.teacherId;
                const name = e.target.dataset.teacherName || 'this teacher';
                const confirmed = confirm(`Delete ${name}? This will also delete all courses and lessons uploaded by this teacher.`);
                if (!confirmed) return;

                try {
                    await apiClient.delete(`/admin/teachers/${id}`);
                    selectedTeacherId = null;
                    selectedTeacherName = '';
                    activeAdminView = 'teachers';
                    load();
                } catch (err) {
                    alert(err.response?.data?.msg || 'Failed to delete teacher');
                    console.error(err);
                }
            });
        });

        document.querySelectorAll('.btn-delete-course').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.courseId;
                if (!confirm('Are you sure you want to delete this course?')) return;
                try {
                    await apiClient.delete(`/admin/courses/${id}`);
                    load();
                } catch (err) {
                    alert('Failed to delete course');
                    console.error(err);
                }
            });
        });

        document.querySelectorAll('.btn-delete-lesson').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const courseId = e.target.dataset.courseId;
                const lessonId = e.target.dataset.lessonId;
                if (!confirm('Delete this lesson?')) return;
                try {
                    await apiClient.delete(`/admin/courses/${courseId}/lessons/${lessonId}`);
                    load();
                } catch (err) {
                    alert('Failed to delete lesson');
                    console.error(err);
                }
            });
        });

        document.getElementById('create-user-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            try {
                await apiClient.post('/admin/users', {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    role: formData.get('role'),
                });
                e.currentTarget.reset();
                load();
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to create user');
                console.error(err);
            }
        });
    };

    await load();
};
