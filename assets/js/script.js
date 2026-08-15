/* =============================================================
   صحتنا | Sehetna — Shared JavaScript (Vanilla JS)
   Features:
   - Mobile menu toggle
   - Navbar active page detection + scroll state
   - Smooth scrolling for in-page anchors
   - Scroll reveal animations (IntersectionObserver)
   - Animated statistic counters
   - Back to top button
   - Dynamic year in footer
   - Contact form (Formspree-friendly) UX feedback
   ============================================================= */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Helpers
     ---------------------------------------------------------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupHeaderScroll();
    setupMobileMenu();
    setupActivePage();
    setupSmoothScroll();
    setupScrollReveal();
    setupCounters();
    setupBackToTop();
    setupFooterYear();
    setupContactForm();
  }

  /* ----------------------------------------------------------
     1. Header shadow on scroll
     ---------------------------------------------------------- */
  function setupHeaderScroll() {
    const header = $("#header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------
     2. Mobile menu toggle
     ---------------------------------------------------------- */
  function setupMobileMenu() {
    const toggle = $("#navToggle");
    const menu = $("#navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      const icon = toggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    // Close the menu when a link is chosen
    $$(".nav__link", menu).forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        const icon = toggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }

  /* ----------------------------------------------------------
     3. Active page detection
     Highlights the nav link that matches the current file.
     ---------------------------------------------------------- */
  function setupActivePage() {
    let current = window.location.pathname.split("/").pop();
    if (!current) current = "index.html";

    $$(".nav__link").forEach((link) => {
      const target = link.getAttribute("href");
      if (!target) return;
      const isMatch =
        target === current ||
        (current === "" && target === "index.html") ||
        // Treat project-details as part of the Projects section
        ((current === "project-details.html" ||
          current === "project-blood.html") &&
          target === "projects.html");
      link.classList.toggle("active", isMatch);
      if (isMatch) link.setAttribute("aria-current", "page");
    });
  }

  /* ----------------------------------------------------------
     4. Smooth scrolling for same-page anchors
     ---------------------------------------------------------- */
  function setupSmoothScroll() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        const target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ----------------------------------------------------------
     5. Scroll reveal animations
     ---------------------------------------------------------- */
  function setupScrollReveal() {
    const items = $$(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     6. Animated counters (data-count attribute)
     ---------------------------------------------------------- */
  function setupCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const runCounter = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString("en-US") + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString("en-US") + suffix;
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     7. Back to top button
     ---------------------------------------------------------- */
  function setupBackToTop() {
    const btn = $("#toTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("show", window.scrollY > 500);
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ----------------------------------------------------------
     8. Dynamic year in footer
     ---------------------------------------------------------- */
  function setupFooterYear() {
    $$("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ----------------------------------------------------------
     9. Contact form UX (works with Formspree action)
     If no real Formspree endpoint is set, we simulate success.
     ---------------------------------------------------------- */
  function setupContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    const status = $("#formStatus");
    const action = form.getAttribute("action") || "";
    const isConfigured = action.includes("formspree.io");

    form.addEventListener("submit", async (e) => {
      // Let a configured Formspree endpoint submit normally,
      // but still enhance with async feedback.
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ الإرسال...';

      try {
        if (isConfigured) {
          const res = await fetch(action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });
          if (!res.ok) throw new Error("network");
        } else {
          // Demo mode: simulate a short delay
          await new Promise((r) => setTimeout(r, 1200));
        }

        showStatus(
          status,
          "success",
          "تم إرسال رسالتك بنجاح! سنعود إليك قريباً."
        );
        form.reset();
      } catch (err) {
        showStatus(
          status,
          "error",
          "تعذّر إرسال الرسالة. حاول مرة أخرى لاحقاً."
        );
      } finally {
        btn.disabled = false;
        btn.innerHTML = original;
      }
    });
  }

  function showStatus(el, type, message) {
    if (!el) return;
    const color = type === "success" ? "#0f766e" : "#dc2626";
    el.textContent = message;
    el.style.color = color;
    el.style.fontWeight = "600";
    el.style.marginTop = "1rem";
    el.setAttribute("role", "status");
    setTimeout(() => {
      el.textContent = "";
    }, 6000);
  }
})();
