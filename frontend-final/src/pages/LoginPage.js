import { handleLogin } from '../auth.js';

const AuthStyles = () => `
  <style>
    .auth-shell {
      min-height: calc(100vh - 82px);
      display: grid;
      place-items: center;
      padding: 48px 20px;
      background:
        radial-gradient(circle at 10% 12%, rgba(64, 97, 161, 0.12), transparent 26%),
        radial-gradient(circle at 88% 20%, rgba(214, 139, 26, 0.10), transparent 24%),
        linear-gradient(180deg, #f8fafc 0%, #ffffff 56%, #f6f7fb 100%);
    }

    .auth-panel {
      width: min(980px, 100%);
      display: grid;
      grid-template-columns: minmax(0, 0.92fr) minmax(360px, 0.72fr);
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 26px;
      background: #ffffff;
      overflow: hidden;
      box-shadow: 0 34px 90px rgba(15, 23, 42, 0.13);
    }

    .auth-intro {
      position: relative;
      padding: 42px;
      background: #172033;
      color: #ffffff;
      overflow: hidden;
    }

    .auth-intro::after {
      content: '';
      position: absolute;
      right: -70px;
      bottom: -80px;
      width: 240px;
      height: 240px;
      border-radius: 999px;
      background: rgba(214, 139, 26, 0.18);
    }

    .auth-brand-mark {
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: #4061a1;
      color: #ffffff;
      box-shadow: 0 18px 40px rgba(64, 97, 161, 0.24);
    }

    .auth-brand-mark svg {
      width: 26px;
      height: 26px;
    }

    .auth-eyebrow {
      margin-top: 30px;
      color: rgba(255, 255, 255, 0.68);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .auth-intro h1 {
      margin-top: 14px;
      max-width: 420px;
      color: #ffffff;
      font-size: clamp(32px, 4vw, 48px);
      line-height: 1.05;
      font-weight: 900;
      letter-spacing: 0;
    }

    .auth-intro p {
      margin-top: 18px;
      max-width: 450px;
      color: rgba(255, 255, 255, 0.72);
      font-size: 15px;
      line-height: 1.75;
    }

    .auth-points {
      position: relative;
      display: grid;
      gap: 12px;
      margin-top: 34px;
      z-index: 1;
    }

    .auth-point {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.07);
      padding: 13px 14px;
      color: rgba(255, 255, 255, 0.84);
      font-size: 13px;
      font-weight: 750;
    }

    .auth-point span {
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      width: 28px;
      height: 28px;
      border-radius: 10px;
      background: #d68b1a;
      color: #ffffff;
      font-size: 13px;
      font-weight: 900;
    }

    .auth-card {
      padding: 42px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .auth-card h2 {
      color: #111827;
      font-size: 30px;
      line-height: 1.15;
      font-weight: 900;
      letter-spacing: 0;
    }

    .auth-subtitle {
      margin-top: 9px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
      font-weight: 650;
    }

    .auth-form {
      display: grid;
      gap: 18px;
      margin-top: 30px;
    }

    .auth-field {
      display: grid;
      gap: 8px;
    }

    .auth-label {
      color: #334155;
      font-size: 13px;
      font-weight: 850;
    }

    .auth-input-wrap {
      position: relative;
    }

    .auth-input {
      width: 100%;
      min-height: 50px;
      border: 1px solid #dbe3ef;
      border-radius: 14px;
      background: #f8fafc;
      padding: 0 44px 0 14px;
      color: #111827;
      font-size: 14px;
      font-weight: 650;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .auth-input:focus {
      border-color: rgba(64, 97, 161, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
    }

    .auth-input-icon {
      position: absolute;
      inset: 0 14px 0 auto;
      display: grid;
      place-items: center;
      color: #94a3b8;
      pointer-events: none;
    }

    .auth-input-icon svg {
      width: 19px;
      height: 19px;
    }

    .auth-submit {
      min-height: 52px;
      border: 0;
      border-radius: 14px;
      background: #4061a1;
      color: #ffffff;
      font-size: 15px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 18px 36px rgba(64, 97, 161, 0.22);
      transition: transform 0.2s ease, background 0.2s ease, opacity 0.2s ease;
    }

    .auth-submit:hover {
      background: #334b84;
      transform: translateY(-1px);
    }

    .auth-submit:disabled {
      opacity: 0.72;
      cursor: not-allowed;
      transform: none;
    }

    .auth-switch {
      margin-top: 24px;
      border-top: 1px solid #eef2f7;
      padding-top: 20px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
      font-weight: 650;
      text-align: center;
    }

    .auth-switch a {
      color: #4061a1;
      font-weight: 900;
      text-decoration: none;
    }

    .auth-switch a:hover {
      text-decoration: underline;
    }

    @media (max-width: 860px) {
      .auth-panel {
        grid-template-columns: 1fr;
      }

      .auth-intro {
        padding: 32px;
      }
    }

    @media (max-width: 520px) {
      .auth-shell {
        padding: 28px 14px;
      }

      .auth-intro,
      .auth-card {
        padding: 26px 20px;
      }
    }
  </style>
`;

const BookIcon = () => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19.5A2.5 2.5 0 016.5 17H20V5H6.5A2.5 2.5 0 004 7.5v12zm0-12.5l8 4.5 8-4.5" />
  </svg>
`;

export const LoginPage = () => {
  return `
    ${AuthStyles()}
    <section class="auth-shell">
      <div class="auth-panel">
        <aside class="auth-intro">
          <div class="auth-brand-mark">${BookIcon()}</div>
          <p class="auth-eyebrow">Secure learning access</p>
          <h1>Continue your learning path with Shiksha Jyoti.</h1>
          <p>Sign in to access enrolled courses, watch lessons, and return to your student, teacher, or admin workspace.</p>
          <div class="auth-points">
            <div class="auth-point"><span>1</span> Role-based dashboard after login</div>
            <div class="auth-point"><span>2</span> Course and lesson access in one place</div>
            <div class="auth-point"><span>3</span> Simple interface for focused learning</div>
          </div>
        </aside>

        <div class="auth-card">
          <div>
            <h2>Welcome back</h2>
            <p class="auth-subtitle">Use your registered email and password to sign in.</p>
          </div>

          <form id="login-form" class="auth-form">
            <div class="auth-field">
              <label for="email" class="auth-label">Email address</label>
              <div class="auth-input-wrap">
                <input id="email" name="email" type="email" autocomplete="email" required class="auth-input" placeholder="you@example.com">
                <span class="auth-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4zM4 7l8 6 8-6"></path>
                  </svg>
                </span>
              </div>
            </div>

            <div class="auth-field">
              <label for="password" class="auth-label">Password</label>
              <div class="auth-input-wrap">
                <input id="password" name="password" type="password" autocomplete="current-password" required class="auth-input" placeholder="Enter your password">
                <span class="auth-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11V8a5 5 0 0110 0v3M6 11h12v9H6z"></path>
                  </svg>
                </span>
              </div>
            </div>

            <button type="submit" class="auth-submit">Sign in</button>
          </form>

          <p class="auth-switch">
            New to Shiksha Jyoti?
            <a href="/register" data-link>Create a student account</a>
          </p>
        </div>
      </div>
    </section>
  `;
};

export const initLoginPage = () => {
    const form = document.querySelector('#login-form');
    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button.textContent;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        button.disabled = true;
        button.textContent = 'Signing in...';

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        const success = await handleLogin(email, password);

        if (!success) {
            button.disabled = false;
            button.textContent = originalButtonText;
        }
    });
};
