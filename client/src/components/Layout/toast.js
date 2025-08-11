// Lightweight global toast utility using toast.css
// Usage: import { showToast } from './toast'; showToast('Saved!', 'success', 3000)

import './toast.css';

let activeToasts = [];

function buildToast(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${type} entering`;
  el.textContent = message;
  return el;
}

function positionToasts() {
  // Stack toasts vertically if multiple are shown
  let offset = 20; // starting from bottom
  activeToasts.forEach((t) => {
    t.style.bottom = `${offset}px`;
    t.style.right = '20px';
    offset += t.offsetHeight + 12;
  });
}

export function showToast(message, type = 'info', duration = 3000) {
  try {
    const toast = buildToast(message, type);
    document.body.appendChild(toast);

    // Trigger show state
    requestAnimationFrame(() => {
      toast.classList.remove('entering');
      toast.classList.add('show');
      positionToasts();
    });

    activeToasts.push(toast);

    const remove = () => {
      toast.classList.remove('show');
      toast.classList.add('exiting');
      setTimeout(() => {
        toast.remove();
        activeToasts = activeToasts.filter((t) => t !== toast);
        positionToasts();
      }, 280);
    };

    // Auto-hide
    const timer = setTimeout(remove, duration);

    // Close on click
    toast.addEventListener('click', () => {
      clearTimeout(timer);
      remove();
    });
  } catch (e) {
    // Fallback: console log if DOM not available
    console[type === 'error' ? 'error' : 'log'](`[toast:${type}] ${message}`);
  }
}
