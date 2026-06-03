const ContactStyles = () => `
  <style>
    .contact-page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 10% 0%, rgba(64, 97, 161, 0.08), transparent 24%),
        radial-gradient(circle at 90% 8%, rgba(214, 139, 26, 0.07), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #ffffff 52%, #f7f8fb 100%);
      padding: 24px 0 52px;
    }

    .contact-shell {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .contact-hero {
  display: block;
  margin-bottom: 24px;
}

    .contact-hero-main {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 20px;
      background:
        linear-gradient(135deg, #ffffff 0%, #f8fafc 64%),
        radial-gradient(circle at 88% 18%, rgba(64, 97, 161, 0.10), transparent 28%);
        box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
        overflow: hidden;
        text-align: center;
        padding: 36px 32px;

    }
        .contact-hero-subtitle {
  margin-left: auto;
  margin-right: auto;
}

    .contact-hero-eyebrow {
      color: #4061a1;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .contact-hero-title {
      margin-top: 8px;
      color: #111827;
      font-size: clamp(30px, 3.6vw, 44px);
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: 0;
    }

    .contact-hero-subtitle {
      margin-top: 14px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.8;
      max-width: 720px;
    }

    .contact-hero-side {
      border-radius: 20px;
      background: linear-gradient(135deg, #4061a1 0%, #334b84 100%);
      padding: 22px;
      color: #ffffff;
      box-shadow: 0 16px 40px rgba(64, 97, 161, 0.16);
    }

    .contact-side-label {
      color: rgba(255, 255, 255, 0.80);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
    }

    .contact-side-list {
      margin-top: 16px;
      display: grid;
      gap: 12px;
    }

   .contact-side-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #f8fafc;
  margin-bottom: 12px;
}

 .contact-side-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(64,97,161,0.10);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  flex-shrink:0;
}

  .contact-side-item h3 {
  color: #111827;
  font-size: 15px;
  font-weight: 800;
}

   .contact-side-item p {
  margin-top: 6px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

    .contact-workspace {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

    .contact-card {
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
      overflow: hidden;
    }

    .contact-form-header {
      padding: 20px 22px;
      border-bottom: 1px solid #eef2f7;
      background: #ffffff;
    }

    .contact-form-title {
      color: #111827;
      font-size: 20px;
      font-weight: 900;
      line-height: 1.2;
    }

    .contact-form-subtitle {
      margin-top: 6px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.65;
    }

    .contact-form-body {
      padding: 20px 22px;
    }

    .contact-field {
      display: grid;
      gap: 8px;
      margin-bottom: 14px;
    }

    .contact-label {
      color: #334155;
      font-size: 13px;
      font-weight: 900;
    }

    .contact-input {
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
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .contact-input:focus {
      border-color: rgba(64, 97, 161, 0.55);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(64, 97, 161, 0.10);
    }

    textarea.contact-input {
      min-height: 132px;
      padding-top: 13px;
      resize: vertical;
    }

    .contact-inline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 10px;
    }

    .contact-help {
      color: #64748b;
      font-size: 13px;
      font-weight: 800;
    }

    .contact-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      border: 0;
      border-radius: 13px;
      background: #4061a1;
      color: #ffffff;
      font-size: 14px;
      font-weight: 900;
      padding: 0 16px;
      cursor: pointer;
      box-shadow: 0 16px 32px rgba(64, 97, 161, 0.20);
      transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
    }

    .contact-submit:hover {
      background: #334b84;
      transform: translateY(-1px);
    }

    .contact-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .contact-message {
      margin-top: 18px;
      padding: 14px 16px;
      border-radius: 14px;
      border: 1px solid transparent;
      display: none;
    }

    .contact-message.visible {
      display: block;
    }

    .contact-message.success {
      background: rgba(16, 185, 129, 0.08);
      border-color: rgba(16, 185, 129, 0.25);
      color: rgba(21, 128, 61, 1);
    }

    .contact-message.error {
      background: rgba(239, 68, 68, 0.08);
      border-color: rgba(239, 68, 68, 0.25);
      color: rgba(185, 28, 28, 1);
    }

    .contact-faq {
      margin-top: 24px;
      padding: 18px 0 0;
    }

    .faq-grid {
      margin-top: 18px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .faq-card {
      padding: 18px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
    }

    .faq-card h3 {
      color: #111827;
      font-size: 15px;
      font-weight: 900;
    }

    .faq-card p {
      margin-top: 8px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.75;
    }

    @media (max-width: 980px) {
      .contact-hero,
      .contact-workspace {
        grid-template-columns: 1fr;
      }

      .contact-side-list {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 640px) {
      .contact-shell {
        width: min(100% - 28px, 1180px);
      }

      .faq-grid {
        grid-template-columns: 1fr;
      }

      textarea.contact-input {
        min-height: 120px;
      }
    }
  </style>
`;

export const ContactPage = () => {
  return `
    ${ContactStyles()}
    <div class="contact-page">
      <div class="contact-shell">
        <div class="contact-hero">
          <div class="contact-hero-main">
            <p class="contact-hero-eyebrow">Support & Contact</p>
            <h1 class="contact-hero-title">Get in Touch</h1>
            <p class="contact-hero-subtitle">
              Have questions about courses, enrollment, or learning support? Send a message and our team will get back to you.
            </p>
          </div>

          
        </div>

        <div class="contact-workspace">
          <section class="contact-card">
            <div class="contact-form-header">
              <div class="contact-form-title">Send us a message</div>
              <div class="contact-form-subtitle">Share your query and we’ll reach out as soon as possible.</div>
            </div>
            <div class="contact-form-body">
              <form id="contact-form">
                <div class="contact-field">
                  <label class="contact-label" for="fullName">Full Name <span style="color:#ef4444;">*</span></label>
                  <input id="fullName" name="fullName" type="text" required class="contact-input" placeholder="Enter your full name" />
                  <div id="fullName-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div class="contact-field">
                  <label class="contact-label" for="email">Email Address <span style="color:#ef4444;">*</span></label>
                  <input id="email" name="email" type="email" required class="contact-input" placeholder="Enter your email address" />
                  <div id="email-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div class="contact-field">
                  <label class="contact-label" for="subject">Subject <span style="color:#ef4444;">*</span></label>
                  <input id="subject" name="subject" type="text" required class="contact-input" placeholder="What is this about?" />
                  <div id="subject-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div class="contact-field">
                  <label class="contact-label" for="message">Message <span style="color:#ef4444;">*</span></label>
                  <textarea id="message" name="message" required class="contact-input" placeholder="Tell us how we can help you..."></textarea>
                  <div id="message-error" class="text-red-500 text-sm mt-1 hidden"></div>
                </div>

                <div class="contact-inline">
                  <div class="contact-help"><span style="color:#ef4444;">*</span> Required fields</div>
                  <button type="submit" id="submit-btn" class="contact-submit">
                    <span id="submit-text">Send Message</span>
                    <span id="submit-spinner" class="hidden" aria-hidden="true" style="margin-left:10px;display:inline-flex;align-items:center;">
                      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </button>
                </div>

                <div id="form-message" class="contact-message" aria-live="polite">
                  <div id="success-message" class="contact-message success">
  <strong>✓ Message Sent Successfully</strong>
  <br>
  Thank you for contacting Shiksha Jyoti.
  We will respond within 24–48 hours.
</div>
                  <div id="error-message" class="contact-message error">Failed to send message. Please try again later.</div>
                </div>
              </form>
            </div>
          </section>

          <aside class="contact-card" style="position: sticky; top: 98px;">

               <div class="contact-form-header">
                 <div class="contact-form-title">
                      Quick Contact
                  </div>

                 <div class="contact-form-subtitle">
                     Reach us directly through the following channels.
                 </div>
               </div>

  <div class="contact-form-body">

    <div class="contact-side-list">

      <div class="contact-side-item">
        <div class="contact-side-icon">📧</div>

        <div>
          <h3>Email</h3>
          <p>
            milanchauhan0987@gmail.com
            <br>
            milan.cse2023@huroorkee.ac.in
          </p>
        </div>
      </div>

      <div class="contact-side-item">
        <div class="contact-side-icon">📞</div>

        <div>
          <h3>Call Us</h3>
          <p>
            +91 9520735041
            <br>
            
          </p>
        </div>
      </div>

      <div class="contact-side-item">
        <div class="contact-side-icon">🕒</div>

        <div>
          <h3>Working Hours</h3>
          <p>
            Mon–Fri: 9:00 AM–6:00 PM
            <br>
            Sat: 10:00 AM–4:00 PM
            <br>
            Sun: Closed
          </p>
        </div>
      </div>

    </div>

  </div>

</aside>
        </div>
        <section class="contact-card" style="margin-top:24px;">

  <div class="contact-form-header">
    <div class="contact-form-title">
      Frequently Asked Questions
    </div>

    <div class="contact-form-subtitle">
      Quick answers to common questions.
    </div>
  </div>

  <div class="contact-form-body">

    <div class="faq-grid">

      <div class="faq-card">
        <h3>How do I enroll in a course?</h3>
        <p>
          Browse the course catalog, open a course,
          and click "Enroll Now".
        </p>
      </div>

      <div class="faq-card">
        <h3>Are the courses free?</h3>
        <p>
          Yes. All courses are completely free
          for learners.
        </p>
      </div>

      <div class="faq-card">
        <h3>Can I use it on mobile?</h3>
        <p>
          Yes. The platform works on desktop,
          tablet and mobile devices.
        </p>
      </div>

      <div class="faq-card">
        <h3>How do I become a teacher?</h3>
        <p>
          Contact us using the form and our team
          will guide you through the process.
        </p>
      </div>

    </div>

  </div>

</section>
      </div>
    </div>
  `;
};

export const initContactPage = () => {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const submitText = document.getElementById("submit-text");
  const submitSpinner = document.getElementById("submit-spinner");
  const formMessage = document.getElementById("form-message");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  // Form validation function
  const validateForm = () => {
    let isValid = true;
    const fields = ["fullName", "email", "subject", "message"];

    fields.forEach((fieldName) => {
      const field = document.getElementById(fieldName);
      if (!field) return; // safety
      const errorDiv = document.getElementById(fieldName + "-error");

      // Clear previous errors
      field.classList.remove("border-red-500");
      if (errorDiv) {
        errorDiv.classList.add("hidden");
        errorDiv.textContent = "";
      }

      // Validate required fields
      if (!field.value.trim()) {
        field.classList.add("border-red-500");
        const label =
          fieldName === "fullName"
            ? "Full Name"
            : fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        if (errorDiv) {
          errorDiv.textContent = `${label} is required`;
          errorDiv.classList.remove("hidden");
        }
        isValid = false;
        return; // skip further checks for this field
      }

      // Email validation
      if (fieldName === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          field.classList.add("border-red-500");
          if (errorDiv) {
            errorDiv.textContent = "Please enter a valid email address";
            errorDiv.classList.remove("hidden");
          }
          isValid = false;
        }
      }
    });

    return isValid;
  };

  // Show/hide messages
  const showMessage = (isSuccess) => {
    formMessage.classList.add("visible");

    if (isSuccess) {
      successMessage.classList.add("visible");
      errorMessage.classList.remove("visible");
    } else {
      successMessage.classList.remove("visible");
      errorMessage.classList.add("visible");
    }
  };

  const hideMessage = () => {
    formMessage.classList.remove("visible");
    successMessage.classList.remove("visible");
    errorMessage.classList.remove("visible");
  };

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    hideMessage();

    if (!validateForm()) {
      return;
    }

    submitBtn.disabled = true;
    submitText.classList.add("hidden");
    submitSpinner.classList.remove("hidden");

    try {
      const formData = new FormData(form);

      const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,

          name: data.fullName,
          email: data.email,
          subject: data.subject,
          message: data.message,

          from_name: "Shiksha Jyoti Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        showMessage(true);
        form.reset();

        formMessage.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Web3Forms Error:", error);
      showMessage(false);
    } finally {
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      submitSpinner.classList.add("hidden");
    }
  });

  // Real-time validation
  const fieldsList = ["fullName", "email", "subject", "message"];
  fieldsList.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (!field) return;
    field.addEventListener("blur", () => {
      const errorDiv = document.getElementById(fieldName + "-error");

      if (!field.value.trim()) {
        field.classList.add("border-red-500");
        const label =
          fieldName === "fullName"
            ? "Full Name"
            : fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        if (errorDiv) {
          errorDiv.textContent = `${label} is required`;
          errorDiv.classList.remove("hidden");
        }
      } else {
        field.classList.remove("border-red-500");
        if (errorDiv) errorDiv.classList.add("hidden");

        // Email validation on blur
        if (fieldName === "email" && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            field.classList.add("border-red-500");
            if (errorDiv) {
              errorDiv.textContent = "Please enter a valid email address";
              errorDiv.classList.remove("hidden");
            }
          }
        }
      }
    });

    field.addEventListener("input", () => {
      if (field.value.trim()) {
        field.classList.remove("border-red-500");
        const err = document.getElementById(fieldName + "-error");
        if (err) err.classList.add("hidden");
      }
    });
  });
};
