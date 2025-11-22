import { getUser } from '../auth';

const Navbar = (user) => {
    const isTeacher = user && user.role === 'teacher';
    const isAdmin = user && user.role === 'admin';
    const isLoggedIn = !!user;

    const publicLinks = `
        <a href="/login" data-link class="btn-primary text-sm font-semibold leading-6 px-4 py-2 rounded-lg hover-lift transition-all duration-300">
            Log in <span aria-hidden="true">&rarr;</span>
        </a>
        <a href="/contact" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">Contact
        </a>
    `;

    const studentLinks = `
        <a href="/courses" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">Courses</a>
        <a href="/dashboard" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">Dashboard</a>
        <button id="logout-button" class="text-sm font-semibold leading-6 text-red-600 hover:text-red-700 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-red-50">Log out</button>
        <a href="/contact" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">Contact</a>
    `;

    const teacherLinks = `
        <a href="/courses" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">Courses</a>
        <a href="/teacher-dashboard" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">My Dashboard</a>
        <button id="logout-button" class="text-sm font-semibold leading-6 text-red-600 hover:text-red-700 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-red-50">Log out</button>
    `;

    const adminLinks = `
        <a href="/admin" data-link class="text-sm font-semibold leading-6 text-gray-700 hover:text-primary-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-primary-50">Admin</a>
        <button id="logout-button" class="text-sm font-semibold leading-6 text-red-600 hover:text-red-700 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-red-50">Log out</button>
    `;


    let navLinks;
    if (!isLoggedIn) {
        navLinks = publicLinks;
    } else if (isTeacher) {
        navLinks = teacherLinks;
    } else if (isAdmin) {
        navLinks = adminLinks;
    } else {
        navLinks = studentLinks;
    }

    return `
        <header class="glass border-b border-white/20 backdrop-blur-md sticky top-0 z-40">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="/" data-link class="-m-1.5 p-1.5 group">
                        <span class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-secondary-700 transition-all duration-300">
                            Shiksha Jyoti
                        </span>
                    </a>
                </div>
                <div class="flex gap-x-2">
                    ${navLinks}
                </div>
            </nav>
        </header>
    `;
};

export const updateNavbar = async () => {
    const user = await getUser();
    const navbarContainer = document.querySelector('#navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = Navbar(user);
    }
};

