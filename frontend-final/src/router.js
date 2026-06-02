import { HomePage } from './pages/HomePage';
import { LoginPage, initLoginPage } from './pages/LoginPage';
import { RegisterPage, initRegisterPage } from './pages/RegisterPage';
import { DashboardPage, initDashboardPage } from './pages/DashboardPage';
import { TeacherDashboardPage, initTeacherDashboardPage } from './pages/TeacherDashboardPage';
import { CoursesPage, initCoursesPage } from './pages/CoursesPage';
import { CourseDetailsPage, initCourseDetailsPage } from './pages/CourseDetailsPage';
import { ManageCoursePage, initManageCoursePage } from './pages/ManageCoursePage'; // Import the new page
import { AdminPage, initAdminPage } from './pages/AdminPage';
import { renderPage } from './utils/renderer';
import { updateNavbar } from './components/Navbar';
import { updateFooter } from './components/Footer';
import { ContactPage, initContactPage } from './pages/ContactPage';
import { getUser } from './auth';

// Define your application's routes
const routes = {
    '/': { component: HomePage },
    '/login': { component: LoginPage, init: initLoginPage },
    '/register': { component: RegisterPage, init: initRegisterPage },
    '/courses': { component: CoursesPage, init: initCoursesPage },
    '/courses/:id': { component: CourseDetailsPage, init: initCourseDetailsPage, isPrivate: true },
    '/dashboard': { component: DashboardPage, init: initDashboardPage, isPrivate: true },
    '/teacher-dashboard': { component: TeacherDashboardPage, init: initTeacherDashboardPage, isPrivate: true, requiredRole: 'teacher' },
    '/teacher/course/:id': { component: ManageCoursePage, init: initManageCoursePage, isPrivate: true, requiredRole: 'teacher' },
    '/contact': { component: ContactPage, init: initContactPage },
    '/admin': { component: AdminPage, init: initAdminPage, isPrivate: true, requiredRole: 'admin' },
};

export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

export const router = async () => {
    const path = window.location.pathname;
    console.log('Router called with path:', path);

    const user = getUser();

    // Handle dynamic routes like /courses/:id
    let match = null;
    for (const route in routes) {
        const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '([\\w-]+)')}$`);
        const potentialMatch = path.match(routeRegex);
        
        if (potentialMatch) {
            match = {
                route: routes[route],
                params: potentialMatch.slice(1),
            };
            console.log('Route matched:', route, 'with params:', potentialMatch.slice(1));
            break;
        }
    }
    
    if (!match) {
        // Handle 404 - Not Found
        console.log('No route matched, using 404 page');
        match = { route: { component: () => `<h1>404 - Page Not Found</h1>` } };
    }

    const requiredRole = match.route?.requiredRole;
    if (match.route?.isPrivate && !user) {
        console.log('Route is private and user is not authenticated, redirecting to /login');
        navigateTo('/login');
        return;
    }

    if (requiredRole && (!user || user.role !== requiredRole)) {
        console.log(`User does not have the required role ${requiredRole} for this route`, user);
        if (!user) {
            navigateTo('/login');
        } else if (user.role === 'teacher') {
            navigateTo('/teacher-dashboard');
        } else {
            navigateTo('/dashboard');
        }
        return;
    }

    console.log('Rendering page:', match.route);
    renderPage(match.route, match.route.isPrivate);
    updateNavbar();
    updateFooter();
};

