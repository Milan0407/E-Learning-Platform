import apiClient from '../apiClient';

export const AdminPage = (courses = []) => {
    const courseCards = courses.map(c => `
        <div class="card p-4 mb-4 border rounded">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-semibold">${c.title}</h3>
                    <p class="text-sm text-gray-600">By: ${c.teacher?.name || 'Unknown'}</p>
                </div>
                <div class="flex gap-2">
                    <button data-course-id="${c._id}" class="btn-delete-course text-red-600">Delete Course</button>
                </div>
            </div>
            <div class="mt-3">
                <h4 class="font-semibold">Lessons</h4>
                <ul class="mt-2">
                    ${c.lessons.map(l => `
                        <li class="flex justify-between items-center py-2 border-b">
                            <div>${l.title}</div>
                            <div class="flex gap-2">
                                <button data-course-id="${c._id}" data-lesson-id="${l._id}" class="btn-delete-lesson text-sm text-red-500">Delete Lesson</button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    return `
        <section class="container mx-auto p-6">
            <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <section class="mb-8">
                <h2 class="text-xl font-semibold mb-2">Create User (Admin/Teacher)</h2>
                <form id="create-user-form" class="flex gap-2">
                    <input name="name" placeholder="Full name" class="input-modern" required />
                    <input name="email" placeholder="email" class="input-modern" required />
                    <input name="password" placeholder="password" class="input-modern" required />
                    <select name="role" class="input-modern">
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <button class="btn-primary">Create</button>
                </form>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-2">Courses</h2>
                <div id="admin-courses">
                    ${courseCards || '<p>No courses found</p>'}
                </div>
            </section>
        </section>
    `;
};

export const initAdminPage = async () => {
    const load = async () => {
        try {
            const res = await apiClient.get('/admin/courses');
            const container = document.getElementById('page-content');
            container.innerHTML = AdminPage(res.data);
            attachHandlers();
        } catch (err) {
            console.error('Failed to load courses', err);
            document.getElementById('page-content').innerHTML = `<p class="text-red-600">Failed to load admin data</p>`;
        }
    };

    const attachHandlers = () => {
        // Delete course
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

        // Delete lesson
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

        // Create user
        const form = document.getElementById('create-user-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            const body = {
                name: fd.get('name'),
                email: fd.get('email'),
                password: fd.get('password'),
                role: fd.get('role')
            };
            try {
                await apiClient.post('/admin/users', body);
                alert('User created');
                form.reset();
            } catch (err) {
                alert('Failed to create user');
                console.error(err);
            }
        });
    };

    await load();
};
