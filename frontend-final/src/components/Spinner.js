const SpinnerStyles = () => `
  <style>
    .learning-spinner-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      padding: 32px;
    }

    .learning-spinner-card {
      display: grid;
      justify-items: center;
      gap: 14px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.86);
      padding: 24px 28px;
      box-shadow: 0 18px 44px rgba(15, 23, 42, 0.07);
    }

    .learning-spinner {
      position: relative;
      width: 46px;
      height: 46px;
      border-radius: 999px;
      background: conic-gradient(from 0deg, #4061a1, #d68b1a, rgba(64, 97, 161, 0.16), #4061a1);
      animation: learning-spin 0.9s linear infinite;
    }

    .learning-spinner::before {
      content: '';
      position: absolute;
      inset: 5px;
      border-radius: inherit;
      background: #ffffff;
    }

    .learning-spinner::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 50%;
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #4061a1;
      transform: translateX(-50%);
      box-shadow: 0 0 0 5px rgba(64, 97, 161, 0.12);
    }

    .learning-spinner-text {
      color: #64748b;
      font-size: 13px;
      line-height: 1.4;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @keyframes learning-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .learning-spinner {
        animation-duration: 1.8s;
      }
    }
  </style>
`;

const ensureSpinnerStyles = () => {
    if (typeof document === 'undefined' || document.getElementById('learning-spinner-styles')) return;

    const style = document.createElement('style');
    style.id = 'learning-spinner-styles';
    style.textContent = SpinnerStyles().replace(/<\/?style>/g, '');
    document.head.appendChild(style);
};

export const Spinner = (label = 'Loading') => {
    ensureSpinnerStyles();

    return `
        <div class="learning-spinner-wrap" role="status" aria-live="polite">
            <div class="learning-spinner-card">
                <div class="learning-spinner" aria-hidden="true"></div>
                <span class="learning-spinner-text">${label}</span>
            </div>
        </div>
    `;
};
