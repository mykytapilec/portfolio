/* ==========================================================================
   Portfolio scripts
   - Theme toggle (persisted)
   - Mobile navigation
   - Scroll reveal
   - Contact form validation and submission
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // localStorage can throw (private mode, blocked storage), so always wrap it
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        /* ignore */
      }
    },
  };

  /* ---------- Theme toggle ---------- */
  function initTheme() {
    const root = document.documentElement;
    const button = $("#theme-toggle");
    const saved = storage.get("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = saved || (prefersLight ? "light" : "dark");

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      if (button) {
        button.textContent = theme === "dark" ? "☀" : "☾";
        button.setAttribute(
          "aria-label",
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        );
      }
    }

    apply(initial);

    if (button) {
      button.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);
        storage.set("theme", next);
      });
    }
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    const toggle = $("#nav-toggle");
    const list = $("#nav-list");
    if (!toggle || !list) return;

    function setOpen(open) {
      list.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    }

    toggle.addEventListener("click", () => {
      setOpen(!list.classList.contains("is-open"));
    });

    // Close the menu after choosing a link or pressing Escape
    list.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = $$(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;

    const status = $("#form-status");
    const submitBtn = $("button[type='submit']", form);

    const validators = {
      name: (value) =>
        value.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters).",
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? ""
          : "Please enter a valid email address.",
      subject: (value) =>
        value.trim().length >= 3 ? "" : "Please enter a subject (at least 3 characters).",
      message: (value) =>
        value.trim().length >= 10 ? "" : "Your message should be at least 10 characters long.",
    };

    function validateField(input) {
      const validator = validators[input.name];
      if (!validator) return true;

      const error = validator(input.value);
      const field = input.closest(".field");
      const errorEl = $(".field__error", field);

      field.classList.toggle("has-error", Boolean(error));
      input.setAttribute("aria-invalid", String(Boolean(error)));
      errorEl.textContent = error;
      return !error;
    }

    function showStatus(type, message) {
      status.textContent = message;
      status.className = "form__status is-visible is-" + type;
    }

    // Validate on blur, and re-validate while typing once a field has an error
    $$("input[name], textarea[name]", form).forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.closest(".field").classList.contains("has-error")) validateField(input);
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Honeypot: real users never fill this field, bots usually do
      if ($("[name='_gotcha']", form).value) return;

      const inputs = $$("input[name], textarea[name]", form).filter(
        (input) => input.name !== "_gotcha"
      );
      const valid = inputs.map(validateField).every(Boolean);

      if (!valid) {
        showStatus("error", "Please fix the highlighted fields and try again.");
        const firstInvalid = $("[aria-invalid='true']", form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (response.ok) {
          form.reset();
          showStatus("success", "Thank you! Your message has been sent.");
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        showStatus("error", "Something went wrong. Please try again later.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initReveal();
    initContactForm();
    initYear();
  });
})();
