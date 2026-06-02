const HomeStyles = () => `
  <style>
    .home-page {
      background:
        radial-gradient(circle at 12% 10%, rgba(64, 97, 161, 0.12), transparent 28%),
        radial-gradient(circle at 88% 18%, rgba(214, 139, 26, 0.10), transparent 24%),
        linear-gradient(180deg, #f8fafc 0%, #ffffff 48%, #f6f7fb 100%);
      color: #111827;
      overflow: hidden;
    }

    .home-container {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .home-hero {
      min-height: calc(100vh - 92px);
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(380px, 0.92fr);
      align-items: center;
      gap: 54px;
      padding: 46px 0 64px;
    }

    .home-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      border: 1px solid rgba(64, 97, 161, 0.16);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.78);
      padding: 8px 14px;
      color: #334b84;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
    }

    .home-eyebrow-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #d68b1a;
      box-shadow: 0 0 0 5px rgba(214, 139, 26, 0.14);
    }

    .home-title {
      margin-top: 24px;
      max-width: 760px;
      color: #101827;
      font-size: clamp(44px, 6vw, 78px);
      line-height: 0.98;
      font-weight: 900;
      letter-spacing: 0;
    }

    .home-title span {
      color: #4061a1;
    }

    .home-copy {
      margin-top: 24px;
      max-width: 650px;
      color: #475569;
      font-size: 18px;
      line-height: 1.8;
    }

    .home-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 34px;
    }

    .home-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      border-radius: 14px;
      padding: 0 20px;
      font-weight: 800;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .home-button-primary {
      background: #4061a1;
      color: #ffffff;
      box-shadow: 0 18px 36px rgba(64, 97, 161, 0.22);
    }

    .home-button-primary:hover,
    .home-button-secondary:hover {
      transform: translateY(-2px);
    }

    .home-button-secondary {
      border: 1px solid #dbe3ef;
      background: rgba(255, 255, 255, 0.86);
      color: #26364d;
    }

    .home-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      max-width: 650px;
      margin-top: 42px;
    }

    .home-stat {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.76);
      padding: 18px;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.06);
    }

    .home-stat strong {
      display: block;
      color: #111827;
      font-size: 26px;
      line-height: 1;
      font-weight: 900;
    }

    .home-stat span {
      display: block;
      margin-top: 8px;
      color: #64748b;
      font-size: 13px;
      line-height: 1.5;
      font-weight: 650;
    }

    .home-preview-wrap {
      position: relative;
    }

    // .home-preview-wrap::before {
    //   content: '';
    //   position: absolute;
    //   inset: -30px -22px auto auto;
    //   width: 190px;
    //   height: 190px;
    //   border-radius: 999px;
    //   background: rgba(214, 139, 26, 0.14);
    //   filter: blur(4px);
    // }

    .home-preview {
      position: relative;
      border: 1px solid rgba(15, 23, 42, 0.10);
      border-radius: 26px;
      background: #ffffff;
      box-shadow: 0 34px 90px rgba(15, 23, 42, 0.16);
      overflow: hidden;
    }

    .home-preview-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #edf2f7;
      padding: 18px 20px;
      background: #f8fafc;
    }

    .home-window-dots {
      display: flex;
      gap: 7px;
    }

    .home-window-dots span {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #cbd5e1;
    }

    .home-preview-label {
      color: #64748b;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .home-preview-body {
      display: grid;
      grid-template-columns: 0.88fr 1.12fr;
      min-height: 500px;
    }

    .home-preview-sidebar {
      background: #172033;
      padding: 22px;
      color: #ffffff;
    }

    .home-preview-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 850;
    }

    .home-preview-mark {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: #d68b1a;
      color: #ffffff;
      font-size: 20px;
      font-weight: 900;
    }

    .home-preview-nav {
      display: grid;
      gap: 10px;
      margin-top: 28px;
    }

    .home-preview-nav span {
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.08);
      padding: 12px 13px;
      color: rgba(255, 255, 255, 0.74);
      font-size: 13px;
      font-weight: 700;
    }

    .home-preview-nav span:first-child {
      background: #4061a1;
      color: #ffffff;
    }

    .home-preview-progress {
      margin-top: 34px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.08);
      padding: 16px;
    }

    .home-preview-progress p {
      color: rgba(255, 255, 255, 0.72);
      font-size: 12px;
      font-weight: 700;
    }

    .home-progress-track {
      height: 8px;
      margin-top: 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.15);
      overflow: hidden;
    }

    .home-progress-track span {
      display: block;
      width: 72%;
      height: 100%;
      border-radius: inherit;
      background: #d68b1a;
    }

    .home-preview-main {
      padding: 24px;
      background: #ffffff;
    }

    .home-preview-main h2 {
      color: #111827;
      font-size: 22px;
      font-weight: 900;
    }

    .home-preview-main > p {
      margin-top: 6px;
      color: #64748b;
      font-size: 13px;
      line-height: 1.6;
    }

    .home-course-grid {
      display: grid;
      gap: 14px;
      margin-top: 22px;
    }

    .home-course-tile {
      border: 1px solid #e5e7eb;
      border-radius: 18px;
      background: #ffffff;
      padding: 16px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
    }

    .home-course-row {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      align-items: start;
    }

    .home-course-tile h3 {
      color: #111827;
      font-size: 15px;
      font-weight: 850;
    }

    .home-course-tile p {
      margin-top: 5px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.5;
    }

    .home-course-pill {
      flex: 0 0 auto;
      border-radius: 999px;
      background: #f4f6fb;
      padding: 6px 9px;
      color: #4061a1;
      font-size: 11px;
      font-weight: 850;
    }

    .home-course-meter {
      height: 7px;
      margin-top: 14px;
      border-radius: 999px;
      background: #eef2f7;
      overflow: hidden;
    }

    .home-course-meter span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: #4061a1;
    }

    .home-section {
      padding: 76px 0;
    }

    .home-section-header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 28px;
      margin-bottom: 28px;
    }

    .home-section-header h2 {
      max-width: 620px;
      color: #111827;
      font-size: clamp(30px, 4vw, 46px);
      line-height: 1.08;
      font-weight: 900;
      letter-spacing: 0;
    }

    .home-section-header p {
      max-width: 430px;
      color: #64748b;
      font-size: 15px;
      line-height: 1.8;
    }

    .home-feature-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .home-feature-card {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background: #ffffff;
      padding: 24px;
      box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06);
    }

    .home-feature-icon {
      display: grid;
      place-items: center;
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: #f4f6fb;
      color: #4061a1;
      font-size: 22px;
      font-weight: 900;
    }

    .home-feature-card h3 {
      margin-top: 18px;
      color: #111827;
      font-size: 18px;
      font-weight: 900;
    }

    .home-feature-card p {
      margin-top: 10px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.75;
    }

    .home-pathway {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 24px;
      align-items: stretch;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 28px;
      background: #172033;
      padding: 26px;
      box-shadow: 0 28px 80px rgba(15, 23, 42, 0.16);
    }

    .home-pathway-copy {
      padding: 14px 10px;
      color: #ffffff;
    }

    .home-pathway-copy h2 {
      max-width: 480px;
      color: #ffffff;
      font-size: clamp(30px, 4vw, 44px);
      line-height: 1.08;
      font-weight: 900;
      letter-spacing: 0;
    }

    .home-pathway-copy p {
      margin-top: 16px;
      max-width: 480px;
      color: rgba(255, 255, 255, 0.72);
      line-height: 1.75;
    }

    .home-pathway-list {
      display: grid;
      gap: 12px;
    }

    .home-pathway-step {
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 14px;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.08);
      padding: 16px;
      color: #ffffff;
    }

    .home-pathway-step strong {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: #d68b1a;
      color: #ffffff;
      font-weight: 900;
    }

    .home-pathway-step h3 {
      color: #ffffff;
      font-size: 16px;
      font-weight: 850;
    }

    .home-pathway-step p {
      margin-top: 5px;
      color: rgba(255, 255, 255, 0.68);
      font-size: 13px;
      line-height: 1.6;
    }

    @media (max-width: 980px) {
      .home-hero,
      .home-pathway {
        grid-template-columns: 1fr;
      }

      .home-preview-body {
        grid-template-columns: 1fr;
      }

      .home-preview-sidebar {
        display: none;
      }

      .home-section-header {
        display: block;
      }

      .home-section-header p {
        margin-top: 14px;
      }

      .home-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .home-container {
        width: min(100% - 28px, 1180px);
      }

      .home-hero {
        min-height: auto;
        padding: 34px 0 48px;
      }

      .home-title {
        font-size: 42px;
      }

      .home-copy {
        font-size: 16px;
      }

      .home-actions,
      .home-stats {
        grid-template-columns: 1fr;
      }

      .home-button {
        width: 100%;
      }

      .home-stats {
        display: grid;
      }

      .home-pathway {
        padding: 18px;
        border-radius: 20px;
      }
    }
  </style>
`;

export const HomePage = () => {
  return `
    ${HomeStyles()}
    <div class="home-page">
      <section class="home-container home-hero">
        <div>
          <div class="home-eyebrow">
            <span class="home-eyebrow-dot"></span>
            Digital learning for every classroom
          </div>
          <h1 class="home-title">
            Build skills with a platform made for <span>serious learning.</span>
          </h1>
          <p class="home-copy">
            Shiksha Jyoti brings courses, guided lessons, teacher-created content, and learner dashboards into one clean education experience for students across India.
          </p>
          <div class="home-actions">
            <a href="/courses" data-link class="home-button home-button-primary">Explore Courses</a>
            <a href="/register" data-link class="home-button home-button-secondary">Create Student Account</a>
          </div>
          <div class="home-stats" aria-label="Platform highlights">
            <div class="home-stat">
              <strong>Free</strong>
              <span>Open access learning for students</span>
            </div>
            <div class="home-stat">
              <strong>Video</strong>
              <span>Lesson-first course delivery</span>
            </div>
            <div class="home-stat">
              <strong>3 roles</strong>
              <span>Students, teachers, and admins</span>
            </div>
          </div>
        </div>

        <div class="home-preview-wrap" aria-label="Learning dashboard preview">
          <div class="home-preview">
            <div class="home-preview-top">
              <div class="home-window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="home-preview-label">Student Workspace</div>
            </div>
            <div class="home-preview-body">
              <aside class="home-preview-sidebar">
                <div class="home-preview-logo">
                  <div class="home-preview-mark">S</div>
                  <span>Shiksha Jyoti</span>
                </div>
                <div class="home-preview-nav">
                  <span>My Courses</span>
                  <span>Lessons</span>
                  <span>Teachers</span>
                  <span>Support</span>
                </div>
                <div class="home-preview-progress">
                  <p>Weekly learning progress</p>
                  <div class="home-progress-track"><span></span></div>
                </div>
              </aside>
              <main class="home-preview-main">
                <h2>Continue learning</h2>
                <p>Personal course cards help students jump back into lessons and track progress.</p>
                <div class="home-course-grid">
                  <div class="home-course-tile">
                    <div class="home-course-row">
                      <div>
                        <h3>Foundations of Mathematics</h3>
                        <p>12 lessons by a community teacher</p>
                      </div>
                      <span class="home-course-pill">72%</span>
                    </div>
                    <div class="home-course-meter"><span style="width: 72%;"></span></div>
                  </div>
                  <div class="home-course-tile">
                    <div class="home-course-row">
                      <div>
                        <h3>English Communication</h3>
                        <p>8 practical video lessons</p>
                      </div>
                      <span class="home-course-pill">45%</span>
                    </div>
                    <div class="home-course-meter"><span style="width: 45%;"></span></div>
                  </div>
                  <div class="home-course-tile">
                    <div class="home-course-row">
                      <div>
                        <h3>Basic Science Concepts</h3>
                        <p>Start with the first module</p>
                      </div>
                      <span class="home-course-pill">New</span>
                    </div>
                    <div class="home-course-meter"><span style="width: 18%;"></span></div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      <section class="home-container home-section">
        <div class="home-section-header">
          <h2>A cleaner way to manage digital education.</h2>
          <p>Every part of the platform is organized around the people who use it: students who learn, teachers who create, and admins who keep quality high.</p>
        </div>
        <div class="home-feature-grid">
          <article class="home-feature-card">
            <div class="home-feature-icon">1</div>
            <h3>Course discovery</h3>
            <p>Students can browse available courses, view course details, and enroll before accessing lesson videos.</p>
          </article>
          <article class="home-feature-card">
            <div class="home-feature-icon">2</div>
            <h3>Teacher publishing</h3>
            <p>Teachers can create course outlines and upload video lessons directly from their own workspace.</p>
          </article>
          <article class="home-feature-card">
            <div class="home-feature-icon">3</div>
            <h3>Admin control</h3>
            <p>Admins can manage teacher accounts, review courses, and remove lessons or courses when needed.</p>
          </article>
        </div>
      </section>

      <section class="home-container home-section">
        <div class="home-pathway">
          <div class="home-pathway-copy">
            <h2>From enrollment to lesson playback in a focused flow.</h2>
            <p>The product experience is intentionally simple: find a course, enroll, learn through videos, and return to the dashboard whenever you need to continue.</p>
          </div>
          <div class="home-pathway-list">
            <div class="home-pathway-step">
              <strong>01</strong>
              <div>
                <h3>Browse the course catalog</h3>
                <p>Students start with a clean, searchable course library.</p>
              </div>
            </div>
            <div class="home-pathway-step">
              <strong>02</strong>
              <div>
                <h3>Enroll with one action</h3>
                <p>Enrollment connects the learner to the course and unlocks lessons.</p>
              </div>
            </div>
            <div class="home-pathway-step">
              <strong>03</strong>
              <div>
                <h3>Learn at a steady pace</h3>
                <p>Lesson playback and dashboards keep the experience focused.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
};

export const initHomePage = () => {
  // Home page is static for now.
};