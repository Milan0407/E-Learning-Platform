import { getUser } from '../auth';

const NavbarStyles = () => `
    <style>
        .site-header {
            position: sticky;
            top: 0;
            z-index: 40;
            border-bottom: 1px solid rgba(15, 23, 42, 0.08);
            background: rgba(255, 255, 255, 0.86);
            backdrop-filter: blur(18px);
        }

        .site-nav {
            width: min(1180px, calc(100% - 40px));
            min-height: 82px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
        }

        .site-brand {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            color: #111827;
            text-decoration: none;
            flex: 0 0 auto;
        }

        .site-brand-mark {
            display: grid;
            place-items: center;
            width: 46px;
            height: 46px;
            border-radius: 14px;
            background: #4061a1;
            color: #ffffff;
            box-shadow: 0 16px 32px rgba(64, 97, 161, 0.20);
        }

        .site-brand-mark svg {
            width: 23px;
            height: 23px;
        }

        .site-brand-name {
            color: #101827;
            font-size: 18px;
            line-height: 1.1;
            font-weight: 900;
            letter-spacing: 0;
        }

        .site-brand-subtitle {
            margin-top: 3px;
            color: #64748b;
            font-size: 11px;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        .site-links {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-wrap: wrap;
        }

        .site-link,
        .site-logout {
            min-height: 40px;
            border: 0;
            border-radius: 12px;
            background: transparent;
            padding: 0 13px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-size: 14px;
            font-weight: 800;
            text-decoration: none;
            cursor: pointer;
            transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .site-link:hover,
        .site-logout:hover {
            background: #f4f6fb;
            color: #4061a1;
        }

        .site-link-primary {
            background: #4061a1;
            color: #ffffff;
            box-shadow: 0 14px 30px rgba(64, 97, 161, 0.18);
        }

        .site-link-primary:hover {
            background: #334b84;
            color: #ffffff;
            transform: translateY(-1px);
        }

        .site-link-muted {
            border: 1px solid #dbe3ef;
            background: #ffffff;
        }

        .site-logout {
            color: #b91c1c;
        }

        .site-logout:hover {
            background: #fff1f2;
            color: #991b1b;
        }

        .site-role-pill {
            min-height: 32px;
            border-radius: 999px;
            background: #f8fafc;
            padding: 0 11px;
            display: inline-flex;
            align-items: center;
            color: #64748b;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.10em;
            text-transform: uppercase;
        }

        @media (max-width: 760px) {
            .site-nav {
                width: min(100% - 28px, 1180px);
                min-height: auto;
                padding: 14px 0;
                align-items: flex-start;
                flex-direction: column;
            }

            .site-links {
                width: 100%;
                justify-content: flex-start;
            }

            .site-link,
            .site-logout {
                min-height: 38px;
                padding: 0 11px;
                font-size: 13px;
            }
        }
    </style>
`;

const Link = (href, label, className = '') => `
    <a href="${href}" data-link class="site-link ${className}">${label}</a>
`;

const LogoutButton = () => `
    <button id="logout-button" type="button" class="site-logout">Log out</button>
`;

const Navbar = (user) => {
    const isTeacher = user && user.role === 'teacher';
    const isAdmin = user && user.role === 'admin';
    const isLoggedIn = !!user;

    const publicLinks = `
        ${Link('/courses', 'Courses')}
        ${Link('/contact', 'Contact')}
        ${Link('/login', 'Log in', 'site-link-muted')}
        ${Link('/register', 'Sign up', 'site-link-primary')}
    `;

    const studentLinks = `
        <span class="site-role-pill">Student</span>
        ${Link('/courses', 'Courses')}
        ${Link('/dashboard', 'Dashboard', 'site-link-primary')}
        ${Link('/contact', 'Contact')}
        ${LogoutButton()}
    `;

    const teacherLinks = `
        <span class="site-role-pill">Teacher</span>
        ${Link('/courses', 'Courses')}
        ${Link('/teacher-dashboard', 'Teacher Dashboard', 'site-link-primary')}
        ${LogoutButton()}
    `;

    const adminLinks = `
        <span class="site-role-pill">Admin</span>
        ${Link('/admin', 'Admin Portal', 'site-link-primary')}
        ${LogoutButton()}
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
        ${NavbarStyles()}
        <header class="site-header">
            <nav class="site-nav" aria-label="Global navigation">
                <a href="/" data-link class="site-brand" aria-label="Shiksha Jyoti home">
                    <span class="site-brand-mark">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19.5A2.5 2.5 0 016.5 17H20V5H6.5A2.5 2.5 0 004 7.5v12zm0-12.5l8 4.5 8-4.5" />
                        </svg>
                    </span>
                    <span>
                        <span class="site-brand-name">Shiksha Jyoti</span>
                        <span class="site-brand-subtitle">Digital Education</span>
                    </span>
                </a>
                <div class="site-links">
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
