const FooterStyles = () => `
  <style>
    .site-footer {
      margin-top: 0;
      border-top: 1px solid rgba(15, 23, 42, 0.08);
      background:
        radial-gradient(circle at 8% 10%, rgba(64, 97, 161, 0.10), transparent 24%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      color: #111827;
    }

    .footer-container {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
      padding: 54px 0 26px;
    }

    .footer-main {
      display: grid;
      grid-template-columns: minmax(280px, 1.35fr) repeat(3, minmax(150px, 0.65fr));
      gap: 36px;
      align-items: start;
    }

    .footer-brand {
      max-width: 440px;
    }

    .footer-logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: #101827;
      text-decoration: none;
    }

    .footer-logo-mark {
      display: grid;
      place-items: center;
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: #4061a1;
      color: #ffffff;
      box-shadow: 0 16px 32px rgba(64, 97, 161, 0.18);
    }

    .footer-logo-mark svg {
      width: 23px;
      height: 23px;
    }

    .footer-logo-text strong {
      display: block;
      color: #101827;
      font-size: 19px;
      line-height: 1.15;
      font-weight: 900;
    }

    .footer-logo-text span {
      display: block;
      margin-top: 3px;
      color: #64748b;
      font-size: 11px;
      line-height: 1.2;
      font-weight: 850;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .footer-description {
      margin-top: 20px;
      color: #475569;
      font-size: 15px;
      line-height: 1.8;
    }

    .footer-status {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin-top: 22px;
      border: 1px solid #dbe3ef;
      border-radius: 999px;
      background: #ffffff;
      padding: 9px 13px;
      color: #334155;
      font-size: 13px;
      font-weight: 800;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
    }

    .footer-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #16a34a;
      box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.12);
    }

    .footer-column h3 {
      color: #111827;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .footer-links {
      display: grid;
      gap: 12px;
      margin-top: 16px;
      padding: 0;
      list-style: none;
    }

    .footer-links a {
      color: #64748b;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 700;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-links a:hover {
      color: #4061a1;
    }

    .footer-note {
      border-top: 1px solid rgba(15, 23, 42, 0.08);
      margin-top: 42px;
      padding-top: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      color: #64748b;
      font-size: 13px;
      line-height: 1.6;
      font-weight: 650;
    }

    .footer-note-links {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .footer-note-links a {
      color: #64748b;
      text-decoration: none;
      font-weight: 750;
    }

    .footer-note-links a:hover {
      color: #4061a1;
    }

    @media (max-width: 920px) {
      .footer-main{
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:24px;
}

    
    }

   @media (max-width:768px){

  .site-footer{
      margin-top:10px;
  }

  .footer-container{
      width:calc(100% - 24px);
      padding:28px 0 20px;
  }

  /* Brand Section */

.footer-brand{
    grid-column:1 / -1;
    text-align:left;
    max-width:none;
    margin:0;
}

.footer-logo{
    justify-content:flex-start;
}

.footer-status{
    margin-top:18px;
    margin-left:0;
    margin-right:0;
}

  .footer-logo-text span{
      display:none;
  }

  .footer-description{
      max-width:420px;
      
      font-size:14px;
      line-height:1.8;
  }


  /* Footer Grid */

  .footer-main{
      grid-template-columns:repeat(2,1fr);
      gap:28px 20px;
      align-items:start;
  }

  .footer-column{
      width:100%;
      text-align:left;
  }

  .footer-column h3{
      font-size:13px;
      margin-bottom:10px;
  }

  .footer-links{
      gap:10px;
      margin-top:10px;
  }

  .footer-links a{
      font-size:13px;
  }

  /* Support stays left aligned */

  .footer-column:last-child{
      grid-column:auto;
      text-align:left;
      width:100%;
  }

  /* Bottom Area */

  .footer-note{
      margin-top:28px;
      padding-top:18px;
      flex-direction:column;
      align-items:center;
      text-align:center;
      gap:8px;
  }

  .footer-note-links{
      justify-content:center;
      gap:14px;
  }
}
      
  </style>
`;

export const Footer = () => {
  const year = new Date().getFullYear();

  return `
    ${FooterStyles()}
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-main">
          <div class="footer-brand">
            <a href="/" data-link class="footer-logo" aria-label="Shiksha Jyoti home">
              <span class="footer-logo-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19.5A2.5 2.5 0 016.5 17H20V5H6.5A2.5 2.5 0 004 7.5v12zm0-12.5l8 4.5 8-4.5" />
                </svg>
              </span>
              <span class="footer-logo-text">
                <strong>Shiksha Jyoti</strong>
                <span>Digital Education</span>
              </span>
            </a>
            <p class="footer-description">
              A focused learning platform for students, teachers, and administrators who need simple access to digital courses and video lessons.
            </p>
            <div class="footer-status">
              <span class="footer-status-dot"></span>
              Platform available for learning
            </div>
          </div>

          <div class="footer-column">
            <h3>Platform</h3>
            <ul class="footer-links">
              <li><a href="/courses" data-link>Browse courses</a></li>
              <li><a href="/register" data-link>Student signup</a></li>
              <li><a href="/login" data-link>Sign in</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Workspaces</h3>
            <ul class="footer-links">
              <li><a href="/dashboard" data-link>Student dashboard</a></li>
              <li><a href="/teacher-dashboard" data-link>Teacher dashboard</a></li>
              <li><a href="/admin" data-link>Admin portal</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Support</h3>
            <ul class="footer-links">
              <li><a href="/contact" data-link>Contact</a></li>
              <li><a href="/courses" data-link>Course catalog</a></li>
              <li><a href="/login" data-link>Account access</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-note">
          <p>&copy; ${year} Shiksha Jyoti. All rights reserved.</p>
          <div class="footer-note-links">
            <a href="/contact" data-link>Help</a>
            <a href="/courses" data-link>Courses</a>
          </div>
        </div>
      </div>
    </footer>
  `;
};

export const updateFooter = () => {
    const footerContainer = document.querySelector('#footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = Footer();
    }
};
