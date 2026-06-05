/* ============================================================
   AMG-GEO-Mineral -- Main JavaScript
   Navigation, form validation, smooth scroll, active nav
   ============================================================ */

(function () {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initMobileNav();
    initActiveNavLink();
    initSmoothScroll();
    initFormValidation();
  }

  /* ---------- Mobile Navigation Toggle ---------- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__links');

    if (!toggle || !menu) return;

    // Manage aria-hidden based on viewport so desktop nav is always accessible
    var mql = window.matchMedia('(min-width: 768px)');
    function handleViewportChange(e) {
      if (e.matches) {
        // Desktop: nav always visible, remove aria-hidden for screen readers
        menu.removeAttribute('aria-hidden');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        // Mobile: menu starts closed
        menu.setAttribute('aria-hidden', 'true');
      }
    }
    mql.addEventListener('change', handleViewportChange);
    handleViewportChange(mql);

    toggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      menu.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    });

    // Close menu when clicking a link (on mobile)
    menu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        if (menu.getAttribute('aria-hidden') === 'false') {
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
        }
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.getAttribute('aria-hidden') === 'false') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        toggle.focus();
      }
    });
  }

  /* ---------- Active Nav Link ---------- */
  function initActiveNavLink() {
    // Extract the filename from the URL path for robust matching
    var pathParts = window.location.pathname.split('/');
    var fileName = pathParts[pathParts.length - 1] || '';

    var currentPage = '';
    if (fileName === '' || fileName === 'index.html') {
      currentPage = 'home';
    } else if (fileName.indexOf('services') !== -1) {
      currentPage = 'services';
    } else if (fileName.indexOf('contact') !== -1) {
      currentPage = 'contact';
    }

    var navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.classList.remove('nav__link--active');
      var href = link.getAttribute('href');

      if (currentPage === 'home' && (href === 'index.html' || href === '/' || href === '.')) {
        link.classList.add('nav__link--active');
      } else if (currentPage === 'services' && href && href.indexOf('services') !== -1) {
        link.classList.add('nav__link--active');
      } else if (currentPage === 'contact' && href && href.indexOf('contact') !== -1) {
        link.classList.add('nav__link--active');
      }
    });
  }

  /* ---------- Smooth Scroll ---------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ---------- Form Validation ---------- */
  function initFormValidation() {
    var form = document.querySelector('.form');
    if (!form) return;

    // Track touched fields for showing errors after first interaction
    var touchedFields = {};

    var fields = [
      {
        id: 'form-name',
        validate: function (value) {
          return value.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).';
        }
      },
      {
        id: 'form-email',
        validate: function (value) {
          if (!value.trim()) return 'Please enter your email address.';
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
        }
      },
      {
        id: 'form-phone',
        validate: function (value) {
          if (!value.trim()) return ''; // Optional field
          var cleaned = value.replace(/[\s\-\(\)\.\+]/g, '');
          return /^\d{7,15}$/.test(cleaned) ? '' : 'Please enter a valid phone number.';
        }
      },
      {
        id: 'form-company',
        validate: function (value) {
          if (!value.trim()) return ''; // Optional field
          return value.trim().length >= 2 ? '' : 'Company name must be at least 2 characters.';
        }
      },
      {
        id: 'form-message',
        validate: function (value) {
          return value.trim().length >= 10 ? '' : 'Please enter a message (at least 10 characters).';
        }
      }
    ];

    // Cache DOM elements
    var elements = {};
    var errorElements = {};
    fields.forEach(function (field) {
      var el = document.getElementById(field.id);
      if (el) {
        elements[field.id] = el;
        var errorEl = el.parentElement.querySelector('.form__error');
        if (errorEl) {
          errorElements[field.id] = errorEl;
        }
      }
    });

    // Validate a single field
    function validateField(fieldId) {
      var el = elements[fieldId];
      var errorEl = errorElements[fieldId];
      if (!el || !errorEl) return true;

      var fieldConfig = fields.find(function (f) { return f.id === fieldId; });
      if (!fieldConfig) return true;

      var errorMessage = fieldConfig.validate(el.value);
      var hasError = errorMessage !== '';

      if (hasError && touchedFields[fieldId]) {
        el.classList.add('form__input--error');
        el.classList.remove('form__input--success');
        errorEl.textContent = errorMessage;
        errorEl.classList.add('form__error--visible');
        return false;
      } else if (hasError) {
        // Field not yet touched -- clear error styles
        el.classList.remove('form__input--error');
        el.classList.remove('form__input--success');
        errorEl.classList.remove('form__error--visible');
        return false;
      } else {
        el.classList.remove('form__input--error');
        el.classList.add('form__input--success');
        errorEl.classList.remove('form__error--visible');
        return true;
      }
    }

    // Validate all fields
    function validateAll() {
      // Mark all as touched
      fields.forEach(function (f) { touchedFields[f.id] = true; });

      var allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field.id)) {
          allValid = false;
        }
      });
      return allValid;
    }

    // Real-time validation on blur
    fields.forEach(function (field) {
      var el = elements[field.id];
      if (!el) return;

      el.addEventListener('blur', function () {
        touchedFields[field.id] = true;
        validateField(field.id);
      });

      // Real-time validation on input (only if already touched)
      el.addEventListener('input', function () {
        if (touchedFields[field.id]) {
          validateField(field.id);
        }
      });
    });

    // Form submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (validateAll()) {
        // Show success message
        var successEl = document.getElementById('form-success');
        if (successEl) {
          form.reset();
          // Clear all validation states
          fields.forEach(function (field) {
            var el = elements[field.id];
            if (el) {
              el.classList.remove('form__input--error', 'form__input--success');
            }
            var errorEl = errorElements[field.id];
            if (errorEl) {
              errorEl.classList.remove('form__error--visible');
            }
          });
          touchedFields = {};
          successEl.classList.add('form__success--visible');
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Focus the first invalid field
        for (var i = 0; i < fields.length; i++) {
          var el = elements[fields[i].id];
          if (el && el.classList.contains('form__input--error')) {
            el.focus();
            break;
          }
        }
      }
    });
  }

})();
